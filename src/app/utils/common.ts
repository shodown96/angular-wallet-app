export const genAccountNumber: any = (accountNumbers: string[]) => {
    const accountNumber = Math.floor(100000000 + Math.random() * 9000000000).toString()
    if (accountNumbers.includes(accountNumber)) {
        return genAccountNumber(accountNumbers)
    }
    return accountNumber
}

const formatter = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  });


export const formatAmount = (amount: number) => {
    return formatter.format(amount)
    // const regex = `^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}N`
}