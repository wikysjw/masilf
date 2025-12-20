export type Post = {
  id: number;
  author: string;
  role: string;
  time: string;
  text: string;
  likes: number;
  comments: number;
  shares: number;
  badge?: string;
  gradient?: string;
};

export type Story = {
  name: string;
  status: string;
  gradient: string;
};

export type Contact = {
  name: string;
  status: string;
};
