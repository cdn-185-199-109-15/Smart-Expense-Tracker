
export enum ExpenseCategory {
  Food = "Food",
  Transport = "Transport",
  Entertainment = "Entertainment",
  Utilities = "Utilities",
  Health = "Health",
  Shopping = "Shopping",
  Other = "Other",
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: Date;
}
