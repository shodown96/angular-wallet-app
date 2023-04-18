export interface Transaction {
    amount: number;
    type: string,
    // type: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER',
    destination: string;
    source: string;
    timestamp: Date
}