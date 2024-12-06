exports.getBarData = (req, res) => {
  
  const data = [
    { industry: 'Education', benefit: 10 },
    { industry: 'Healthcare', benefit: 8 },
    { industry: 'Design (Graphic & Fashion)', benefit: 7 },
    { industry: 'Personalized Assistance', benefit: 9 },
    { industry: 'Development', benefit: 6 },
    { industry: 'Scientific Research', benefit: 10 },
    { industry: 'Device Privacy & Security', benefit: 7 },
    { industry: 'Extended Reality', benefit: 6 }
  ];

  res.json(data);
  
};

exports.getPieData = (req, res) => {

  const data = [
    { category: 'Education', value: 20 },
    { category: 'Healthcare', value: 15 },
    { category: 'Design', value: 10 },
    { category: 'Personalized Assistance', value: 20 },
    { category: 'Development', value: 15 },
    { category: 'Scientific Research', value: 10 },
    { category: 'Privacy & Security', value: 5 },
    { category: 'Extended Reality', value: 5 }
  ];

  res.json(data);
}