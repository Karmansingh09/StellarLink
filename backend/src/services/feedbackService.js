let feedbackRecords = [
  {
    id: 'fb_1001',
    name: 'Sample Pilot User',
    email: 'pilot@example.com',
    walletAddress: 'GBHPLJTE52JPNNGRU7W5JCKSV3JYFS5ZNMF27IQDTTPDGSP3XRZYCHFE',
    rating: 5,
    feedback: 'StellarLink micro-payment settlement speed is exceptional. Requesting Soroban escrow multi-sig feature in v2.',
    submittedAt: '2026-08-20T14:30:00.000Z',
  },
];

export const feedbackService = {
  addFeedback: async (entry) => {
    const record = {
      id: `fb_${Date.now()}`,
      name: entry.name,
      email: entry.email,
      walletAddress: entry.walletAddress || '',
      rating: entry.rating || 5,
      feedback: entry.feedback,
      submittedAt: new Date().toISOString(),
    };
    feedbackRecords.push(record);
    return record;
  },

  getFeedbacks: async () => {
    return feedbackRecords;
  },

  exportCSV: async () => {
    const header = 'ID,Name,Email,WalletAddress,Rating,Feedback,SubmittedAt\n';
    const rows = feedbackRecords.map(r => 
      `"${r.id}","${r.name}","${r.email}","${r.walletAddress}","${r.rating}","${r.feedback.replace(/"/g, '""')}","${r.submittedAt}"`
    ).join('\n');
    return header + rows;
  },
};

export default feedbackService;
