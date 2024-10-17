import { Box, Select, Grid, MenuItem, FormControl, TextField, InputLabel, Typography, Paper, Dialog,DialogActions, DialogContent, DialogTitle, Button} from '@mui/material';
import SearchWrapper from "./searchwrapper";
import Mudkip from '../../assets/mudkipgoldstar.jpg';
import Groudon from '../../assets/groudongoldstar.jpg'
import Gyarados from '../../assets/gyaradosgoldstar.jpg'
import Lisia from '../../assets/lisiapokemon.jpeg'
import Mewtwo from '../../assets/mewtwogoldstar.jpg'
import Vaporeon from '../../assets/vaporeongoldstar.jpg'
import Rayquaza from '../../assets/rayponcho.jpg'
import { useState } from "react";


const mockData = [
    { id: 1, title: 'Mudkip 1', price: 200, image: Mudkip },
    { id: 2, title: 'Mudkip 2', price: 142, image: Rayquaza },
    { id: 3, title: 'Mudkip 3', price: 5325, image: Groudon },
    { id: 4, title: 'Mudkip 4', price: 553, image: Gyarados },
    { id: 5, title: 'Mudkip 5', price: 7547, image: Lisia },
    { id: 6, title: 'Mudkip 6', price: 77, image: Mewtwo},
    { id: 7, title: 'Mudkip 7', price: 37, image: Vaporeon },
    { id: 8, title: 'Mudkip 8', price: 4, image: Rayquaza },
    { id: 9, title: 'Mudkip 9', price: 843, image: Mudkip },
    { id: 10, title: 'Mudkip 10', price: 679, image: Rayquaza },
    { id: 11, title: 'Mudkip 11', price: 76064, image: Groudon },
    { id: 12, title: 'Mudkip 12', price: 4854, image: Gyarados },
    { id: 13, title: 'Mudkip 13', price: 45833, image: Lisia },
    { id: 14, title: 'Mudkip 14', price: 4584, image: Mewtwo },
    { id: 15, title: 'Mudkip 15', price: 4584, image: Vaporeon },
    { id: 16, title: 'Mudkip 16', price: 45832, image: Rayquaza },
];


const modalData = [
    { id: 1, name: 'WOTC', image: "https://images.pokemontcg.io/base1/logo.png" },
    { id: 2, name: 'EX Series', image:"https://images.pokemontcg.io/ex8/logo.png" },
    { id: 3, name: 'Diamond & Pearl', image:"https://images.pokemontcg.io/dp1/logo.png" },
    { id: 4, name: 'POP Series', image: "https://images.pokemontcg.io/pop2/logo.png" },
    { id: 5, name: 'Platinum', image:"https://images.pokemontcg.io/pl1/logo.png"},
    { id: 6, name: 'HeartGold & SoulSilver', image:"https://images.pokemontcg.io/hgss1/logo.png" },
    { id: 7, name: 'Black & White', image: "https://images.pokemontcg.io/bw1/logo.png" },
    { id: 8, name: 'XY', image:"https://images.pokemontcg.io/xy1/logo.png" },
    { id: 9, name: 'Sun & Moon', image:"https://images.pokemontcg.io/sm1/logo.png"},
    { id: 10, name: 'Sword & Shield', image: "https://images.pokemontcg.io/swsh1/logo.png" },
    { id: 11, name: 'Scarlet & Violet', image: "https://images.pokemontcg.io/sv1/logo.png"},
    {id: 12, name: 'Pokemon Promos', image:"https://images.pokemontcg.io/basep/logo.png" },
    {id: 13, name: 'Misc. Sets', image:"https://images.pokemontcg.io/si1/logo.png" }
];

const WOTCData = [
    { id: 1, setId: "base1",  name: 'Base Set', image: "https://images.pokemontcg.io/base1/logo.png" },
    { id: 2, setId: "base2", name: 'Jungle', image: "https://images.pokemontcg.io/base2/logo.png" },
    { id: 3, setId: "base3", name: 'Fossil', image: "https://images.pokemontcg.io/base3/logo.png"},
    { id: 4, setId: "base4", name: 'Base Set 2', image: "https://images.pokemontcg.io/base4/logo.png"},
    { id: 5, setId: "base5", name: 'Team Rocket', image:"https://images.pokemontcg.io/base5/logo.png"},
    { id: 6, setId: "gym1", name: 'Gym Heroes', image: "https://images.pokemontcg.io/gym1/logo.png" },
    { id: 7, setId: "gym2", name: 'Gym Challenge', image:"https://images.pokemontcg.io/gym2/logo.png" },
    { id: 8, setId: "neo1", name: 'Neo Genesis', image: "https://images.pokemontcg.io/neo1/logo.png" },
    { id: 9, setId: "neo2", name: 'Neo Discovery', image:"https://images.pokemontcg.io/neo2/logo.png" },
    { id: 10, setId: "neo3", name: 'Neo Revelation', image: "https://images.pokemontcg.io/neo3/logo.png"},
  
    { id: 11, setId: "neo4", name: 'Neo Destiny', image: "https://images.pokemontcg.io/neo4/logo.png" },
    { id: 12,setId: "base6",  name: 'Legendary Collection', image: "https://images.pokemontcg.io/base6/logo.png" },
    { id: 14, setId: "ecard1", name: 'Expedition', image: "https://images.pokemontcg.io/ecard1/logo.png"},
    { id: 15, setId: "ecard2", name: 'Aquapolis', image:"https://images.pokemontcg.io/ecard2/logo.png" },
    { id: 16, setId: "ecard3", name: 'Skyridge', image: "https://images.pokemontcg.io/ecard3/logo.png" },

  
    
];
const EXData = [
    { id: 1, setId: "ex1", name: 'Ruby & Sapphire', image: "https://images.pokemontcg.io/ex1/logo.png", imageName: Mewtwo },
    { id: 2, setId: "ex2", name: 'Sandstorm', image: "https://images.pokemontcg.io/ex2/logo.png", imageName: Mewtwo },
    { id: 3, setId: "ex3", name: 'Dragon', image: "https://images.pokemontcg.io/ex3/logo.png", imageName: Mewtwo },
    { id: 4, setId: "ex4", name: 'Team Magma vs Team Aqua', image: "https://images.pokemontcg.io/ex4/logo.png", imageName: Mewtwo },
    { id: 5, setId: "ex5", name: 'Hidden Legends', image: "https://images.pokemontcg.io/ex5/logo.png", imageName: Mewtwo },
    { id: 6, setId: "ex6", name: 'FireRed & LeafGreen', image: "https://images.pokemontcg.io/ex6/logo.png", imageName: Mewtwo },
    { id: 7, setId: "ex7", name: 'Team Rocket Returns', image: "https://images.pokemontcg.io/ex7/logo.png", imageName: Lisia },
    { id: 8, setId: "ex8", name: 'Deoxys', image: "https://images.pokemontcg.io/ex8/logo.png", imageName: Mudkip },
    { id: 9, setId: "ex9", name: 'Emerald', image: "https://images.pokemontcg.io/ex9/logo.png", imageName: Rayquaza },
    { id: 10, setId: "ex10", name: 'Unseen Forces', image: "https://images.pokemontcg.io/ex10/logo.png", imageName: Vaporeon },
    { id: 11, setId: "ex11", name: 'Delta Species', image: "https://images.pokemontcg.io/ex11/logo.png", imageName: Mewtwo },
    { id: 12, setId: "ex12", name: 'Legend Maker', image: "https://images.pokemontcg.io/ex12/logo.png", imageName: Lisia },
    { id: 13, setId: "ex13", name: 'Holon Phantoms', image: "https://images.pokemontcg.io/ex13/logo.png", imageName: Gyarados },
    { id: 14, setId: "ex14", name: 'Crystal Guardians', image: "https://images.pokemontcg.io/ex14/logo.png", imageName: Groudon },
    { id: 15, setId: "ex15", name: 'Dragon Frontiers', image: "https://images.pokemontcg.io/ex15/logo.png", imageName: Rayquaza },
    { id: 16, setId: "ex16", name: 'Power Keepers', image: "https://images.pokemontcg.io/ex16/logo.png", imageName: Mudkip },
];

const DPData = [
    { id: 1, setId: "dp1", name: 'Diamond & Pearl', image: "https://images.pokemontcg.io/dp1/logo.png" },
    { id: 2, setId: "dp2", name: 'Mysterious Treasures', image: "https://images.pokemontcg.io/dp2/logo.png" },
    { id: 3, setId: "dp3", name: 'Secret Wonders', image: "https://images.pokemontcg.io/dp3/logo.png" },
    { id: 4, setId: "dp4", name: 'Great Encounters', image: "https://images.pokemontcg.io/dp4/logo.png" },
    { id: 5, setId: "dp5", name: 'Majestic Dawn', image: "https://images.pokemontcg.io/dp5/logo.png" },
    { id: 6, setId: "dp6", name: 'Legends Awakened', image: "https://images.pokemontcg.io/dp6/logo.png" },
    { id: 7, setId: "dp7", name: 'Stormfront', image: "https://images.pokemontcg.io/dp7/logo.png" },
    { id: 8, setId: "dp8", name: 'Platinum', image: "https://images.pokemontcg.io/pl1/logo.png"},
    { id: 9, setId: "dp9", name: 'Rising Rivals', image: "https://images.pokemontcg.io/pl2/logo.png" },

];
const POPData = [
    { id: 1, setId: "pop1", name: 'POP Series 1', image: "https://images.pokemontcg.io/pop1/symbol.png" },
    { id: 2, setId: "pop2", name: 'POP Series 2', image: "https://images.pokemontcg.io/pop2/symbol.png" },
    { id: 3, setId: "pop3", name: 'POP Series 3', image: "https://images.pokemontcg.io/pop3/symbol.png" },
    { id: 4, setId: "pop4", name: 'POP Series 4', image: "https://images.pokemontcg.io/pop4/symbol.png" },
    { id: 5, setId: "pop5", name: 'POP Series 5', image: "https://images.pokemontcg.io/pop5/symbol.png" },
    { id: 6, setId: "pop6", name: 'POP Series 6', image: "https://images.pokemontcg.io/pop6/symbol.png" },
    { id: 7, setId: "pop7", name: 'POP Series 7', image: "https://images.pokemontcg.io/pop7/symbol.png" },
    { id: 8, setId: "pop8", name: 'POP Series 8', image: "https://images.pokemontcg.io/pop8/symbol.png" },
    { id: 9, setId: "pop9", name: 'POP Series 9', image: "https://images.pokemontcg.io/pop9/symbol.png" },
];

const PlatinumData = [
    { id: 1, setId: "pl1", name: 'Platinum', image: "https://images.pokemontcg.io/pl1/logo.png" },
    { id: 2, setId: "pl2", name: 'Rising Rivals', image: "https://images.pokemontcg.io/pl2/logo.png" },
    { id: 3, setId: "pl3", name: 'Supreme Victors', image: "https://images.pokemontcg.io/pl3/logo.png"},
    { id: 4, setId: "pl4", name: 'Arceus', image: "https://images.pokemontcg.io/pl4/logo.png" },
];

const HGSSData = [
    { id: 1, setId: "hgss1", name: 'HeartGold & SoulSilver', image: "https://images.pokemontcg.io/hgss1/logo.png" },
    { id: 2, setId: "hgss2", name: 'Unleashed', image: "https://images.pokemontcg.io/hgss2/logo.png" },
    { id: 3, setId: "hgss3", name: 'Undaunted', image: "https://images.pokemontcg.io/hgss3/logo.png" },
    { id: 4, setId: "hgss4", name: 'Triumphant', image: "https://images.pokemontcg.io/hgss4/logo.png" },
    { id: 5, setId: "col1", name: 'Call of Legends', image: "https://images.pokemontcg.io/col1/logo.png" },
];

const BWData = [
    { id: 1, setId: "bw1", name: 'Black & White', image: "https://images.pokemontcg.io/bw1/logo.png" },
    { id: 2, setId: "bw2", name: 'Emerging Powers', image: "https://images.pokemontcg.io/bw2/logo.png" },
    { id: 3, setId: "bw3", name: 'Noble Victories', image: "https://images.pokemontcg.io/bw3/logo.png" },
    { id: 4, setId: "bw4", name: 'Next Destinies', image: "https://images.pokemontcg.io/bw4/logo.png" },
    { id: 5, setId: "bw5", name: 'Dark Explorers', image: "https://images.pokemontcg.io/bw5/logo.png" },
    { id: 6, setId: "bw6", name: 'Dragons Exalted', image: "https://images.pokemontcg.io/bw6/logo.png" },
    { id: 7, setId: "bw7", name: 'Boundaries Crossed', image: "https://images.pokemontcg.io/bw7/logo.png" },
    { id: 8, setId: "bw8", name: 'Plasma Storm', image: "https://images.pokemontcg.io/bw8/logo.png" },
    { id: 9, setId: "bw9", name: 'Plasma Freeze', image: "https://images.pokemontcg.io/bw9/logo.png" },
    { id: 10, setId: "bw10", name: 'Plasma Blast', image: "https://images.pokemontcg.io/bw10/logo.png" },
    { id: 11, setId: "bw11", name: 'Legendary Treasures', image: "https://images.pokemontcg.io/bw11/logo.png" },
];

const XYData = [
    { id: 1, setId: "xy0", name: 'Kalos Starter Set', image: "https://images.pokemontcg.io/xy0/logo.png" },
    { id: 2, setId: "xy1", name: 'XY', image: "https://images.pokemontcg.io/xy1/logo.png" },
    { id: 3, setId: "xy2", name: 'Flashfire', image: "https://images.pokemontcg.io/xy2/logo.png" },
    { id: 4, setId: "xy3", name: 'Furious Fists', image: "https://images.pokemontcg.io/xy3/logo.png" },
    { id: 5, setId: "xy4", name: 'Phantom Forces', image: "https://images.pokemontcg.io/xy4/logo.png" },
    { id: 6, setId: "xy5", name: 'Primal Clash', image: "https://images.pokemontcg.io/xy5/logo.png" },
    { id: 7, setId: "dc1", name: 'Double Crisis', image: "https://images.pokemontcg.io/dc1/logo.png" },
    { id: 8, setId: "xy6", name: 'Roaring Skies', image: "https://images.pokemontcg.io/xy6/logo.png" },
    { id: 9, setId: "xy7", name: 'Ancient Origins', image: "https://images.pokemontcg.io/xy7/logo.png" },
    { id: 10, setId: "xy8", name: 'BREAKthrough', image: "https://images.pokemontcg.io/xy8/logo.png" },
    { id: 11, setId: "xy9", name: 'BREAKpoint', image: "https://images.pokemontcg.io/xy9/logo.png" },
    { id: 12, setId: "g1", name: 'Generations', image: "https://images.pokemontcg.io/g1/logo.png" },
    { id: 13, setId: "xy10", name: 'Fates Collide', image: "https://images.pokemontcg.io/xy10/logo.png" },
    { id: 14, setId: "xy11", name: 'Steam Siege', image: "https://images.pokemontcg.io/xy11/logo.png" },
    { id: 15, setId: "xy12", name: 'Evolutions', image: "https://images.pokemontcg.io/xy12/logo.png" },
];

const SMData = [
    { id: 1, setId: "sm1", name: 'Sun & Moon', image: "https://images.pokemontcg.io/sm1/logo.png" },
    { id: 2, setId: "sm2", name: 'Guardians Rising', image: "https://images.pokemontcg.io/sm2/logo.png" },
    { id: 3, setId: "sm3", name: 'Burning Shadows', image: "https://images.pokemontcg.io/sm3/logo.png" },
    { id: 4, setId: "sm35", name: 'Shining Legends', image: "https://images.pokemontcg.io/sm35/logo.png" },
    { id: 5, setId: "sm4", name: 'Crimson Invasion', image: "https://images.pokemontcg.io/sm4/logo.png" },
    { id: 6, setId: "sm5", name: 'Ultra Prism', image: "https://images.pokemontcg.io/sm5/logo.png" },
    { id: 7, setId: "sm6", name: 'Forbidden Light', image: "https://images.pokemontcg.io/sm6/logo.png" },
    { id: 8, setId: "sm7", name: 'Celestial Storm', image: "https://images.pokemontcg.io/sm7/logo.png" },
    { id: 9, setId: "sm75", name: 'Dragon Majesty', image: "https://images.pokemontcg.io/sm75/logo.png" },
    { id: 10, setId: "sm8", name: 'Lost Thunder', image: "https://images.pokemontcg.io/sm8/logo.png" },
    { id: 11, setId: "sm9", name: 'Team Up', image: "https://images.pokemontcg.io/sm9/logo.png" },
    { id: 12, setId: "det1", name: 'Detective Pikachu', image: "https://images.pokemontcg.io/det1/logo.png" },
    { id: 13, setId: "sm10", name: 'Unbroken Bonds', image: "https://images.pokemontcg.io/sm10/logo.png" },
    { id: 14, setId: "sm11", name: 'Unified Minds', image: "https://images.pokemontcg.io/sm11/logo.png" },
    { id: 15, setId: "sm115", name: 'Hidden Fates', image: "https://images.pokemontcg.io/sm115/logo.png" },
    { id: 16, setId: "sm12", name: 'Cosmic Eclipse', image: "https://images.pokemontcg.io/sm12/logo.png" },
];

const SSData = [
    { id: 1, setId: "swsh1", name: 'Sword & Shield', image: "https://images.pokemontcg.io/swsh1/logo.png" },
    { id: 2, setId: "swsh2", name: 'Rebel Clash', image: "https://images.pokemontcg.io/swsh2/logo.png" },
    { id: 3, setId: "swsh3", name: 'Darkness Ablaze', image: "https://images.pokemontcg.io/swsh3/logo.png" },
    { id: 4, setId: "swsh35", name: 'Champion\'s Path', image: "https://images.pokemontcg.io/swsh35/logo.png" },
    { id: 5, setId: "swsh4", name: 'Vivid Voltage', image: "https://images.pokemontcg.io/swsh4/logo.png" },
    { id: 6, setId: "swsh45", name: 'Shining Fates', image: "https://images.pokemontcg.io/swsh45/logo.png" },
    { id: 7, setId: "swsh5", name: 'Battle Styles', image: "https://images.pokemontcg.io/swsh5/logo.png" },
    { id: 8, setId: "swsh6", name: 'Chilling Reign', image: "https://images.pokemontcg.io/swsh6/logo.png" },
    { id: 9, setId: "swsh7", name: 'Evolving Skies', image: "https://images.pokemontcg.io/swsh7/logo.png" },
    { id: 10, setId: "cel25", name: 'Celebrations', image: "https://images.pokemontcg.io/cel25/logo.png" },
    { id: 11, setId: "swsh8", name: 'Fusion Strike', image: "https://images.pokemontcg.io/swsh8/logo.png" },
    { id: 12, setId: "swsh9", name: 'Brilliant Stars', image: "https://images.pokemontcg.io/swsh9/logo.png" },
    { id: 13, setId: "swsh10", name: 'Astral Radiance', image: "https://images.pokemontcg.io/swsh10/logo.png" },
    { id: 14, setId: "pgo", name: 'Pokemon Go', image: "https://images.pokemontcg.io/pgo/logo.png" },
    { id: 15, setId: "swsh11", name: 'Lost Origin', image: "https://images.pokemontcg.io/swsh11/logo.png" },
    { id: 16, setId: "swsh12", name: 'Silver Tempest', image: "https://images.pokemontcg.io/swsh12/logo.png" },
    { id: 17, setId: "swsh12pt5", name: 'Crown Zenith', image: "https://images.pokemontcg.io/swsh12pt5/logo.png" },
];

const SVData = [
    { id: 1, setId: "sv1", name: 'Scarlet & Violet', image: "https://images.pokemontcg.io/sv1/logo.png" },
    { id: 2, setId: "sv2", name: 'Paldea Evolved', image: "https://images.pokemontcg.io/sv2/logo.png" },
    { id: 3, setId: "sv3", name: 'Obsidian Flames', image: "https://images.pokemontcg.io/sv3/logo.png" },
    { id: 4, setId: "sv3pt5", name: '151', image:"https://images.pokemontcg.io/sv3pt5/logo.png" },
    { id: 5, setId: "sv4", name: 'Paradox Rift', image: "https://images.pokemontcg.io/sv4/logo.png" },
    { id: 6, setId: "sv4pt5", name: 'Paldean Fates', image: "https://images.pokemontcg.io/sv4pt5/logo.png" },
    { id: 7, setId: "sv5", name: 'Temporal Forces', image: "https://images.pokemontcg.io/sv5/logo.png" },
    { id: 8, setId: "sv6", name: 'Twilight Masquerade', image: "https://images.pokemontcg.io/sv6/logo.png" },
    { id: 9, setId: "sv6pt5", name: 'Shrouded Fable', image: "https://images.pokemontcg.io/sv6pt5/logo.png" },
    { id: 10, setId: "sv7", name: 'Stellar Crown', image: "https://images.pokemontcg.io/sv7/logo.png" },
];

const PromoData = [
    { id: 1, setId: "basep", name: 'Wizards Promos', image: "https://images.pokemontcg.io/basep/logo.png" },
    { id: 2, setId: "dpp", name: 'Diamond & Pearl Promos', image: "https://images.pokemontcg.io/dpp/logo.png" },
    { id: 3, setId: "np", name: 'Nintendo Promos', image: "https://images.pokemontcg.io/np/logo.png" },
    { id: 4, setId: "hsp", name: 'HeartGold & SoulSilver Promos', image: "https://images.pokemontcg.io/hsp/logo.png" },
    { id: 5, setId: "bwp", name: 'Black & White Promos', image: "https://images.pokemontcg.io/bwp/logo.png" },
    { id: 6, setId: "xyp", name: 'XY Promos', image: "https://images.pokemontcg.io/xyp/logo.png" },
    { id: 7, setId: "smp", name: 'Sun & Moon Promos', image: "https://images.pokemontcg.io/smp/logo.png" },
    { id: 8, setId: "swshp", name: 'Sword & Shield Promos', image: "https://images.pokemontcg.io/swshp/logo.png" },
    { id: 9, setId: "svp", name: 'Scarlet & Violet Promos', image: "https://images.pokemontcg.io/svp/logo.png" },
];

const OtherData = [
    { id: 1, setId: "mcd11", name: 'McDonald\'s Collection 2011', image: "https://images.pokemontcg.io/mcd11/logo.png" },
    { id: 2, setId: "mcd12", name: 'McDonald\'s Collection 2012', image: "https://images.pokemontcg.io/mcd12/logo.png" },
    { id: 3, setId: "mcd14", name: 'McDonald\'s Collection 2014', image: "https://images.pokemontcg.io/mcd14/logo.png" },
    { id: 4, setId: "mcd15", name: 'McDonald\'s Collection 2015', image: "https://images.pokemontcg.io/mcd15/logo.png" },
    { id: 5, setId: "mcd16", name: 'McDonald\'s Collection 2016', image: "https://images.pokemontcg.io/mcd16/logo.png" },
    { id: 6, setId: "mcd17", name: 'McDonald\'s Collection 2017', image: "https://images.pokemontcg.io/mcd17/logo.png" },
    { id: 7, setId: "mcd18", name: 'McDonald\'s Collection 2018', image: "https://images.pokemontcg.io/mcd18/logo.png" },
    { id: 8, setId: "mcd19", name: 'McDonald\'s Collection 2019', image: "https://images.pokemontcg.io/mcd19/logo.png" },
    { id: 9, setId: "mcd21", name: 'McDonald\'s Collection 2021', image: "https://images.pokemontcg.io/mcd21/logo.png" },
    { id: 10, setId: "mcd22", name: 'McDonald\'s Collection 2022', image: "https://images.pokemontcg.io/mcd22/logo.png" },
    { id: 11, setId: "si1", name: 'Southern Islands', image: "https://images.pokemontcg.io/si1/logo.png" },
    { id: 12, setId: "ru1", name: 'Rumble', image: "https://images.pokemontcg.io/ru1/logo.png" },
    { id: 13, setId: "bp", name: 'Best of Game', image: "https://images.pokemontcg.io/bp/logo.png" },
    { id: 14, setId: "fut20", name: 'Pokemon Futsal Collection', image: "https://images.pokemontcg.io/fut20/logo.png" },
];

export default function MainSearch() {
    const [sortOrder, setSortOrder] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [currentModalData, setCurrentModalData] = useState(modalData)
    const [title, setTitle] = useState('All Pokemon Sets');
    
    const [isInitialState, setIsInitialState] = useState(true);
    
   
    const sortedData = [...mockData].sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.id - b.id;
        } else if (sortOrder === 'dsc') {
            return b.id - a.id;
        } else if (sortOrder === 'priceDSC') {
            return b.price - a.price;
        } else if (sortOrder === 'priceASC') {
            return a.price - b.price;
        } else {
            return 0;
        }
    });
    
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };


    const handleModalOpen  = () => {
        setShowModal(true)
    }
    const handleModalClose  = () => {
        setShowModal(false)
        setCurrentModalData(modalData)
        setTitle('All Pokemon Sets')
        setIsInitialState(true);
     
    }
    const handleButtonClick = (newData, newTitle) => {
        setIsInitialState(false);
        setCurrentModalData(newData);
        setTitle('All Pokemon Sets')
        setTitle(newTitle);
    };
    const handleBackButtonClick = () => {
        // Logic to go back to the previous state
        setIsInitialState(true);
        setCurrentModalData(modalData); // Reset to initial modal data
        setTitle('All Pokemon Sets')
    };
    return(
        <>
        <Paper sx={{paddingTop: '80px', height: '100px', backgroundColor: 'transparent', boxShadow: 'none'}}>
        <FormControl sx={{ minWidth: 120, backgroundColor: 'white', marginTop: '20px', marginLeft: '50px'}}>
        <InputLabel id="sort-label"><span className='tiny5-regular'>Sort</span></InputLabel>
        <Select
            labelId="sort-label"
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort"
        >
            <MenuItem value="asc">Oldest</MenuItem>
            <MenuItem value="dsc">Newest</MenuItem>
            <MenuItem value="priceDSC">Highest Price</MenuItem>
            <MenuItem value="priceASC">Lowest Price</MenuItem>
        </Select>
    </FormControl> 
    <Button onClick={handleModalOpen} color="primary" sx={{ 
                backgroundColor: 'rgba(255,255,255)',
                color: 'black', 
                marginLeft: '20px', 
                width: '120px', 
                height: '55px', 
              
                backdropFilter: 'blur(5px)',
                marginTop: '20px'
            }}>
              <span className='tiny5-regular'>Search by Set</span> 
            </Button>
           
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-20px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row',  gap: '10px', marginLeft: '80px'}}>
                    <TextField
                        variant="outlined"
                        placeholder="Search for a card..."
                        sx={{ marginBottom: '20px', width: '40vw', backgroundColor: 'white' }}
                        inputProps={{
                            className: 'poppins-regular', // Add the class to the input element
                        }}
                    />
                    <Button
                        sx={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            color: 'black',
                            background: 'linear-gradient(to bottom, red 50%, white 50%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '2px solid black',
                            marginLeft:"20px"
                        }}
                    >
                        <span className='tiny5-regular'>Go</span>
                    </Button>
                </Box>
            </Box>
          
    <Dialog open={showModal} onClose={handleModalClose} maxWidth="md" fullWidth>
          
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', marginTop: '20px' }}>
        {!isInitialState && (
            <Button onClick={handleBackButtonClick} color="primary">
                Back
            </Button>
        )}
        <DialogTitle sx={{ textAlign: 'center', flex: 1, marginRight: isInitialState ? '0px' : '64px' }}>
        {title}
        </DialogTitle>
    </Box>
            <DialogContent>
            <Grid container spacing={2}>
                            {currentModalData.map((item) => (
                                <Grid item xs={12} sm={6} md={3} key={item.id}>
                                  <Button
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', height: '100px', textAlign: 'center', textTransform: 'none' }}
    onClick={() => item.name === 'WOTC' ? handleButtonClick(WOTCData, 'WOTC Sets') : item.name === 'EX Series' ? handleButtonClick(EXData, 'EX Series Sets') : item.name === "Diamond & Pearl" ? handleButtonClick(DPData, 'Diamond & Pearl') : item.name === "POP Series" ? handleButtonClick(POPData, 'POP Series') : item.name === 'Platinum'? handleButtonClick(PlatinumData, 'Platinum') : item.name === 'HeartGold & SoulSilver' ? handleButtonClick(HGSSData, "HeartGold & SoulSilver") : item.name === "Black & White" ? handleButtonClick(BWData, "Black & White") : item.name === "XY" ? handleButtonClick(XYData, "XY") : item.name === "Sun & Moon" ? handleButtonClick(SMData,"Sun & Moon") : item.name === "Sword & Shield" ? handleButtonClick(SSData, "Sword & Shield") : item.name === "Scarlet & Violet" ? handleButtonClick(SVData, "Scarlet & Violet") : item.name === "Pokemon Promos" ? handleButtonClick(PromoData, "Pokemon Promos") : item.name === "Misc. Sets" ? handleButtonClick(OtherData, "Miscellaneous Sets") :  null}
>
                                        <img src={item.image} alt={item.name} style={{ width: '130px', height: '60px', objectFit: 'contain' }} />
                                        <Typography variant="button" sx={{ flex: 1, fontSize: '10px', color: 'black', textTransform: 'none'}}>
                                            {item.name}
                                        </Typography>
                                    </Button>
                                </Grid>
            ))}
        </Grid>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
            
                <Button sx={{textAlign:'center'}} onClick={handleModalClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>

    </Paper>
    <Typography sx={{textAlign: 'center', fontSize: '24px', padding: '20px', color: 'white'}}>10 results</Typography>
    <Box sx={{ marginTop: '0px', height: '70vh', width: '100vw', flexDirection: 'column', overflowY: 'auto',  padding: '0px' }}>
        <SearchWrapper sortedData={sortedData}/>
        </Box>
        </>
    )
}