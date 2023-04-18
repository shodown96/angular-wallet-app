const ROUTES = {
    Login: 'login',
    Register: 'register',
    Dashboard: 'dashboard',
    Account: 'account',
    MakeTransaction: 'make-transaction',
}

export const config = {
    ROUTES,
    DB_TABLES: {
        Users: "Users",
        Transactions: "Transactions"
    },
    AUTH_USER: "AUTH_USER",
    PATHS: {
        Login: `/${ROUTES.Login}`,
        Register: `/${ROUTES.Register}`,
        Dashboard: `/${ROUTES.Dashboard}`,
        Account: `/${ROUTES.Account}`,
        MakeTransaction: `/${ROUTES.MakeTransaction}`,

    },
    TRANSACTION_TYPES: {
        DEPOSIT: 'DEPOSIT',
        WITHDRAWAL: 'WITHDRAWAL',
        TRANSFER: 'TRANSFER'
    },
    DEPOSIT_SOURCE: 'EXTERNAL',
    ACCOUNT_TYPES: {
        Savings:"Savings",
        Current: "Current"
    }
}