export interface CardModelItem {
  id: number,
  username: number,
  model_id: number,
  model_version_id: number,
  width: number,
  height: number,
  meta: string,
  hash: string,
  url: string,
  download: string,
  nsfw: string,
  created_at: string | null,
  updated_at: string | null
}
export default interface CardItem {
  creator_image: string
  creator_username: string
  id: string
  name: string
  nsfw: number
  stats_comment_count: number
  stats_download_count: number
  stats_favorite_count: number
  stats_rating: string
  stats_rating_count: number
  tags: string
  type: string
  model_images: CardModelItem[]
}