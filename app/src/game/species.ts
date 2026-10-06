// One species unlocks per day. `media` points at Huy's own footage when the species lives in his tanks.
export interface Species {
  day: number;
  name: { vi: string; en: string };
  latin: string;
  fact: string; // one short English fact (A2-B1), shown with Vietnamese UI around it
  hue: string; // glow colour for the procedural jelly
  shape: 'moon' | 'nettle' | 'spotted' | 'box' | 'comb' | 'crown' | 'flower';
  media?: string;
}

export const SPECIES: Species[] = [
  { day: 1, name: { vi: 'Sứa đốm đầm phá', en: 'Spotted lagoon jelly' }, latin: 'Mastigias papua', fact: 'It keeps tiny algae inside its body, so it swims toward the sun like a little farm.', hue: '#F3EEDB', shape: 'spotted', media: 'v01' },
  { day: 2, name: { vi: 'Sứa mặt trăng nhỏ', en: 'Baby moon jelly' }, latin: 'Aurelia aurita (ephyra)', fact: 'A baby moon jelly is called an ephyra and is smaller than a grain of rice.', hue: '#9CC8FF', shape: 'moon', media: 'v04' },
  { day: 3, name: { vi: 'Sứa lửa', en: 'Flame jelly' }, latin: 'Rhopilema esculentum', fact: 'Its body is red, not the water around it. People in Asia also eat it.', hue: '#FF6B3D', shape: 'crown', media: 'v10' },
  { day: 4, name: { vi: 'Sứa hồng biển', en: 'Pink sea nettle' }, latin: 'Chrysaora sp.', fact: 'Its long ribbon arms catch food while the bell pulses slowly.', hue: '#FF8FA3', shape: 'nettle', media: 'v13' },
  { day: 5, name: { vi: 'Sứa pha lê', en: 'Crystal jelly' }, latin: 'Aequorea victoria', fact: 'A glowing protein from this jelly won a Nobel Prize in 2008.', hue: '#B8F3FF', shape: 'moon' },
  { day: 6, name: { vi: 'Sứa trứng chiên', en: 'Fried egg jelly' }, latin: 'Cotylorhiza tuberculata', fact: 'From above it looks exactly like a fried egg floating in the sea.', hue: '#FFD36E', shape: 'flower' },
  { day: 7, name: { vi: 'Sứa mặt trăng khổng lồ', en: 'Giant moon jelly' }, latin: 'Aurelia aurita', fact: 'The four rings in its bell are its stomach and reproductive organs.', hue: '#8EC5FF', shape: 'moon', media: 'v16' },
  { day: 8, name: { vi: 'Sứa cam đốm', en: 'Orange spotted jelly' }, latin: 'Netrostoma setouchianum', fact: 'Its orange crown changes shade with the light in the tank.', hue: '#FF9A5A', shape: 'crown', media: 'v11' },
  { day: 9, name: { vi: 'Sứa lộn ngược', en: 'Upside-down jelly' }, latin: 'Cassiopea andromeda', fact: 'It lies upside down on the sand so the sun can feed its algae.', hue: '#A6E3A1', shape: 'flower' },
  { day: 10, name: { vi: 'Sứa tím sọc', en: 'Purple-striped jelly' }, latin: 'Chrysaora colorata', fact: 'Young fish sometimes hide under its bell for protection.', hue: '#C59BFF', shape: 'nettle' },
  { day: 11, name: { vi: 'Sứa lược', en: 'Comb jelly' }, latin: 'Mnemiopsis leidyi', fact: 'It is not a true jelly. Rainbow lights run along its eight combs.', hue: '#7EF0E0', shape: 'comb' },
  { day: 12, name: { vi: 'Sứa đầu đạn', en: 'Cannonball jelly' }, latin: 'Stomolophus meleagris', fact: 'It is round and hard like a ball and swims surprisingly fast.', hue: '#E8C9A0', shape: 'crown' },
  { day: 13, name: { vi: 'Sứa nến', en: 'Mauve stinger' }, latin: 'Pelagia noctiluca', fact: 'Its Latin name means "night light" because it glows when touched.', hue: '#E46BB0', shape: 'nettle' },
  { day: 14, name: { vi: 'Sứa bờm sư tử', en: "Lion's mane jelly" }, latin: 'Cyanea capillata', fact: 'Its tentacles can be longer than a blue whale.', hue: '#FF7A45', shape: 'nettle' },
  { day: 15, name: { vi: 'Sứa mũ hoa', en: 'Flower hat jelly' }, latin: 'Olindias formosa', fact: 'Its tentacles look like neon flowers on a party hat.', hue: '#FFB86B', shape: 'flower' },
  { day: 16, name: { vi: 'Sứa hộp', en: 'Box jelly' }, latin: 'Chironex fleckeri', fact: 'It has 24 eyes, and some of them can see shapes.', hue: '#D7F2FF', shape: 'box' },
  { day: 17, name: { vi: 'Sứa thuyền buồm', en: 'By-the-wind sailor' }, latin: 'Velella velella', fact: 'A small sail on its back lets the wind carry it across the ocean.', hue: '#6FA8FF', shape: 'flower' },
  { day: 18, name: { vi: 'Sứa vương miện', en: 'Crown jelly' }, latin: 'Cephea cephea', fact: 'Its bell has a raised crown that looks like a royal hat.', hue: '#B07CFF', shape: 'crown' },
  { day: 19, name: { vi: 'Sứa vàng', en: 'Golden jelly' }, latin: 'Mastigias papua etpisoni', fact: 'Millions of golden jellies follow the sun across one lake in Palau every day.', hue: '#F6C453', shape: 'spotted' },
  { day: 20, name: { vi: 'Sứa Atolla', en: 'Atolla jelly' }, latin: 'Atolla wyvillei', fact: 'When attacked it flashes blue lights like an alarm to call for help.', hue: '#FF4D6D', shape: 'crown' },
  { day: 21, name: { vi: 'Sứa bất tử', en: 'Immortal jelly' }, latin: 'Turritopsis dohrnii', fact: 'When it is hurt or old, it can turn back into a baby and start its life again.', hue: '#FFE7F0', shape: 'moon' },
];

export const speciesOf = (day: number) => SPECIES.find((s) => s.day === day) ?? SPECIES[0];
