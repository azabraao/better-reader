export const writingDownWords = 'Anotando palavras';

export const techniques: TechniqueItem[] = [
  { label: 'Varredura', value: 'sweeping' },
  { label: writingDownWords, value: 'writing' },
  { label: '3 fixações', value: '3_fixations' },
  { label: '2 fixações', value: '2_fixations' },
  { label: 'Rastreio', value: 'tracking' },
  { label: 'Sondagem', value: 'scanning' },
  { label: 'Centralizada', value: 'centered' },
  { label: 'Ponta-a-ponta', value: 'end_to_end' },
  { label: 'Cantarolando', value: 'singing' },
];

export const techniquesToItems = (
  entries: Technique[] | undefined
): TechniqueItem[] => {
  if (entries === undefined) {
    return [];
  }

  return entries.map((technique) => {
    const techniqueItem = techniques.find((item) => item.value === technique);

    return techniqueItem as TechniqueItem;
  });
};
