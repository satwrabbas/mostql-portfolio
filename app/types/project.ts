export interface Project {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  image_url: string;
  image_mobile_url?: string;
  tags: string[];
  demo_url?: string;
  github_url?: string;
  created_at?: string;
}