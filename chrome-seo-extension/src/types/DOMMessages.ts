export type DOMMessage = {
  type: 'GET_DOM'
}

export type DOMMessageResponse = {
  url: string,
  title: string;
  headlines: string[];
}