//./docs/config/default.ts

const defaultOrderingTable1 =
   ["mi","li","ki","=||",
    "wj","lj","kj","=||","=||",
    "hi","h","hj", "=||","=||",
    "i","j","=||","=||",
    "hA","hZ","hAZ","=||","=||",
    "kiA","kjA","=||","kiZ","kjZ"];

const defaultPropsValsTable1 = new Map<string, number>([
            ["h", 1],
            ["i", 1],
            ["j", 1],
            //" ",
            ["hi", 1],
            ["hj", 1],
            //" ",
            ["ki", 1],
            ["mi", 1],
            ["li", 1],
            //" ",
            ["lj", 1],
            ["wj", 1],
            ["kj", 1],
            //" ",
            ["hA", 1],
            ["hZ", 1],
            ["hAZ", 1],
            //" ",
            ["kiA", 1],
            ["kjA", 1],
            //" ",
            ["kiZ", 1],
            ["kjZ", 1],
            //" ",
            ["=||", 20],
          ]);

export {
  defaultOrderingTable1,
  defaultPropsValsTable1,
};