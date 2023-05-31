import * as SQLite from "expo-sqlite";

export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database_deneme1.db"),
};
