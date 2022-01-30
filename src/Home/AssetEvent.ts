export interface AssetContract {
  address: string;
  asset_contract_type: string;
  created_date: string;
  name: string;
  nft_version: string;
  opensea_version?: any;
  owner: number;
  schema_name: string;
  symbol: string;
  total_supply: string;
  description: string;
  external_link: string;
  image_url: string;
  default_to_fiat: boolean;
  dev_buyer_fee_basis_points: number;
  dev_seller_fee_basis_points: number;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number;
  buyer_fee_basis_points: number;
  seller_fee_basis_points: number;
  payout_address: string;
}

export interface DisplayData {
  card_display_style: string;
}

export interface Collection {
  banner_image_url: string;
  chat_url?: any;
  created_date: string;
  default_to_fiat: boolean;
  description: string;
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string;
  display_data: DisplayData;
  external_url: string;
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  safelist_request_status: string;
  image_url: string;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username?: any;
  name: string;
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payout_address: string;
  require_email: boolean;
  short_description?: any;
  slug: string;
  telegram_url?: any;
  twitter_username: string;
  instagram_username: string;
  wiki_url?: any;
}

export interface User {
  username: string;
}

export interface Owner {
  user: User;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface Asset {
  id: number;
  token_id: string;
  num_sales: number;
  background_color?: any;
  image_url: string;
  image_preview_url: string;
  image_thumbnail_url: string;
  image_original_url: string;
  animation_url?: any;
  animation_original_url?: any;
  name: string;
  description: string;
  external_link?: any;
  asset_contract: AssetContract;
  permalink: string;
  collection: Collection;
  decimals: number;
  token_metadata: string;
  owner: Owner;
}

export interface PaymentToken {
  id: number;
  symbol: 'ETH';
  address: string;
  image_url: 'https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg';
  name: 'Ether';
  decimals: 18;
  eth_price: string;
  usd_price: string;
}

export interface User2 {
  username: string;
}

export interface Seller {
  user: User2;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface User3 {
  username: string;
}

export interface FromAccount {
  user: User3;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface User4 {
  username: string;
}

export interface ToAccount {
  user: User4;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface Transaction {
  block_hash: string;
  block_number: string;
  from_account: FromAccount;
  id: number;
  timestamp: string;
  to_account: ToAccount;
  transaction_hash: string;
  transaction_index: string;
}

export interface User5 {
  username: string;
}

export interface WinnerAccount {
  user: User5;
  profile_img_url: string;
  address: string;
  config: string;
}

export interface AssetEvent {
  approved_account?: any;
  asset: Asset;
  asset_bundle?: any;
  auction_type?: any;
  bid_amount?: any;
  collection_slug: string;
  contract_address: string;
  created_date: string;
  custom_event_name?: any;
  dev_fee_payment_event?: any;
  dev_seller_fee_basis_points: number;
  duration?: any;
  ending_price?: any;
  event_type: string;
  from_account?: any;
  id: number;
  is_private: boolean;
  owner_account?: any;
  payment_token: PaymentToken;
  quantity: string;
  seller: Seller;
  starting_price?: any;
  to_account?: any;
  total_price: string;
  transaction: Transaction;
  winner_account: WinnerAccount;
  listing_time: string;
}
