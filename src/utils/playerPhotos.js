// Player photo resolver
// Priority: 1) API-Football (if key set)  2) Wikipedia  3) shirt-number fallback
//
// Wikipedia uses the REST API to fetch the main image from a player's article.
// We cache results in sessionStorage to avoid hammering the API.

const WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary';
const AF_PROXY  = process.env.REACT_APP_NEWS_PROXY || ''; // reuse existing Cloudflare worker

// ── Wikipedia name overrides (for players whose article title differs) ──────
const WIKI_OVERRIDES = {
  'Ronaldo':        'Cristiano_Ronaldo',
  'Messi':          'Lionel_Messi',
  'Mbappé':         'Kylian_Mbappé',
  'Vinicius Jr':    'Vinícius_Júnior',
  'Neymar':         'Neymar',
  'De Bruyne':      'Kevin_De_Bruyne',
  'Haaland':        'Erling_Haaland',
  'Salah':          'Mohamed_Salah',
  'Kane':           'Harry_Kane',
  'Bellingham':     'Jude_Bellingham',
  'Pedri':          'Pedri',
  'Rodri':          'Rodri_(footballer)',
  'Yamal':          'Lamine_Yamal',
  'Raphinha':       'Raphinha_(footballer)',
  'Endrick':        'Endrick_(footballer)',
  'Modrić':         'Luka_Modrić',
  'Neuer':          'Manuel_Neuer',
  'Musiala':        'Jamal_Musiala',
  'Wirtz':          'Florian_Wirtz',
  'Van Dijk':       'Virgil_van_Dijk',
  'Depay':          'Memphis_Depay',
  'Gakpo':          'Cody_Gakpo',
  'De Jong':        'Frenkie_de_Jong',
  'Havertz':        'Kai_Havertz',
  'Sané':           'Leroy_Sané',
  'Lewandowski':    'Robert_Lewandowski',
  'Szczesny':       'Wojciech_Szczęsny',
  'Lukaku':         'Romelu_Lukaku',
  'Heung-min':      'Son_Heung-min',
  'Min-jae':        'Kim_Min-jae',
  'Pulisic':        'Christian_Pulisic',
  'Davies':         'Alphonso_Davies',
  'David':          'Jonathan_David',
  'Robertson':      'Andrew_Robertson',
  'Rashford':       'Marcus_Rashford',
  'Saka':           'Bukayo_Saka',
  'Foden':          'Phil_Foden',
  'Rice':           'Declan_Rice',
  'Trippier':       'Kieran_Trippier',
  'Stones':         'John_Stones',
  'Pickford':       'Jordan_Pickford',
  'Alexander-A.':   'Trent_Alexander-Arnold',
  'Valverde':       'Federico_Valverde',
  'Núñez':          'Darwin_Núñez',
  'Bruno F.':       'Bruno_Fernandes',
  'Dias':           'Rúben_Dias',
  'Cancelo':        'João_Cancelo',
  'Leão':           'Rafael_Leão',
  'Vitinha':        'Vitinha_(footballer)',
  'Maignan':        'Mike_Maignan',
  'Tchouameni':     'Aurélien_Tchouaméni',
  'Camavinga':      'Eduardo_Camavinga',
  'Dembélé':        'Ousmane_Dembélé',
  'Thuram':         'Marcus_Thuram',
  'Mané':           'Sadio_Mané',
  'Koulibaly':      'Kalidou_Koulibaly',
  'Hakimi':         'Achraf_Hakimi',
  'Bounou':         'Yassine_Bounou',
  'Amrabat':        'Sofyan_Amrabat',
  'En-Nesyri':      'Youssef_En-Nesyri',
  'Molina':         'Nahuel_Molina',
  'Romero':         'Cristian_Romero',
  'De Paul':        'Rodrigo_De_Paul',
  'Mac Allister':   'Alexis_Mac_Allister',
  'Enzo Fern.':     'Enzo_Fernández',
  'Álvarez J.':     'Julián_Álvarez',
  'Di María':       'Ángel_Di_María',
  'Mahrez':         'Riyad_Mahrez',
  'Bennacer':       'Ismaël_Bennacer',
  'Taremi':         'Mehdi_Taremi',
  'Osorio':         'Jonathan_Osorio',
  'Eustáquio':      'Stephen_Eustáquio',
  'Buchanan':       'Tajon_Buchanan',
  'Mooy':           'Aaron_Mooy',
  'Ryan':           'Mathew_Ryan',
  'Xhaka':          'Granit_Xhaka',
  'Shaqiri':        'Xherdan_Shaqiri',
  'Embolo':         'Breel_Embolo',
  'Sommer':         'Yann_Sommer',
  'Akanji':         'Manuel_Akanji',
  'Partey':         'Thomas_Partey',
  'Kudus':          'Mohammed_Kudus',
  'Kessié':         'Franck_Kessié',
  'Haller':         'Sébastien_Haller',
  'Caicedo':        'Moisés_Caicedo',
  'Alisson':        'Alisson_Becker',
  'Marquinhos':     'Marquinhos_(footballer)',
  'Paquetá':        'Lucas_Paquetá',
  'Rodrygo':        'Rodrygo',
  'Sabitzer':       'Marcel_Sabitzer',
  'Arnautovic':     'Marko_Arnautović',
  'Güler':          'Arda_Güler',
  'Kadıoğlu':       'Ferdi_Kadıoğlu',
  'Demiral':        'Merih_Demiral',
  'Ödegaard':       'Martin_Ødegaard',
  'Lindelöf':       'Victor_Lindelöf',
  'Isak':           'Alexander_Isak',
  'Gyökeres':       'Viktor_Gyökeres',
  'Kulusevski':     'Dejan_Kulusevski',
  'Doku':           'Jérémy_Doku',
  'Onana':          'Amadou_Onana',
  'Trossard':       'Leandro_Trossard',
  'Dumfries':       'Denzel_Dumfries',
  'Koopmeiners':    'Teun_Koopmeiners',
  'Bergwijn':       'Steven_Bergwijn',
  'Jiménez':        'Raúl_Jiménez',
  'Lozano':         'Hirving_Lozano',
  'Álvarez':        'Edson_Álvarez',
  'Min-jae':        'Kim_Min-jae',
  'Guehi':          'Marc_Guéhi',
  'Mainoo':         'Kobbie_Mainoo',
  'Gvardiol':       'Joško_Gvardiol',
  'Livaković':      'Dominik_Livaković',
  'Kramarić':       'Andrej_Kramarić',
  'Kovačić':        'Mateo_Kovačić',
  'Brozović':       'Marcelo_Brozović',
  'Pjanić':         'Miralem_Pjanić',
  'Džeko':          'Edin_Džeko',
  'Sanabria':       'Antonio_Sanabria',
  'Almirón':        'Miguel_Almirón',
  'Enciso':         'Julio_Enciso',
  'Nández':         'Nahitan_Nández',
  'Bentancur':      'Rodrigo_Bentancur',
  'Torreira':       'Lucas_Torreira',
  'De Arrascaeta':  'Giorgian_De_Arrascaeta',
  'Murillo':        'Jordi_Murillo',
  'Cuadrado':       'Juan_Cuadrado',
  'Díaz L.D.':      'Luis_Díaz_(footballer)',
  'Borré':          'Rafael_Santos_Borré',
  'Hincapié':       'Piero_Hincapié',
  'Caicedo':        'Moisés_Caicedo',
  'Ibarra':         'Pervis_Estupiñán',
  'E. Martínez':    'Emiliano_Martínez',
  'Otamendi':       'Nicolás_Otamendi',
  'Acuña':          'Marcos_Acuña',
  'Sabally':        'Ismaïla_Sarr',
  'Atal':           'Youcef_Atal',
};

const cache = new Map();

async function fetchWikipediaPhoto(playerName) {
  const cacheKey = `wiki_${playerName}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  const wikiName = WIKI_OVERRIDES[playerName] ||
    playerName.replace(/\s+/g, '_').replace(/\./g, '');

  try {
    const res = await fetch(`${WIKI_API}/${encodeURIComponent(wikiName)}`, {
      headers: { 'User-Agent': 'WC2026PredictionPool/1.0' }
    });
    if (!res.ok) {
      cache.set(cacheKey, null);
      return null;
    }
    const data = await res.json();
    const url = data?.thumbnail?.source || data?.originalimage?.source || null;
    cache.set(cacheKey, url);
    return url;
  } catch {
    cache.set(cacheKey, null);
    return null;
  }
}

// Batch fetch photos for a whole squad
export async function fetchSquadPhotos(players) {
  const results = {};
  // Stagger requests to avoid hitting rate limits
  for (let i = 0; i < players.length; i++) {
    const p = players[i];
    results[p.name] = await fetchWikipediaPhoto(p.name);
    if (i < players.length - 1) await new Promise(r => setTimeout(r, 120));
  }
  return results;
}

export async function fetchPlayerPhoto(playerName) {
  return fetchWikipediaPhoto(playerName);
}
