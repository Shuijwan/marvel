/**
* @flow
*/

'use strict';

export type Character = {
  id: number;
  name: string;
  description: string;
  wiki: ?string;
  thumbnail: string;
  portraitImg: string;
  comics: Array<Comic>;
  series: Array<Series>;
  stories: Array<Story>;
  events: Array<Event>;
  urls: Array<Url>;
};

export type Comic = {
  resourceURI: string;
  name: string;
};

export type Series = {
  resourceURI: string;
  name: string;
};

export type Story = {
  resourceURI: string;
  name: string;
  type: string;
};

export type Event = {
  resourceURI: string;
  name: string;
};

export type Url = {
  type: string;
  url: string;
};
