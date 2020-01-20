export interface IFormOptions {
  title: string;
  options: string[];
  selected: string;
  makeSelection: any;
  nextUrl: string;
  alternateNextUrl?: {
    case: string;
    url: string;
  };
}
