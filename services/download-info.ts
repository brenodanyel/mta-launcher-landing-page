import axios from 'axios';

interface StatisticsResult {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: UploaderOrAuthor;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets?: (AssetsEntity)[] | null;
  tarball_url: string;
  zipball_url: string;
  body: string;
}

export interface ReleaseResult {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: UploaderOrAuthor;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: string;
  published_at: string;
  assets?: (AssetsEntity)[] | null;
  tarball_url: string;
  zipball_url: string;
  body: string;
}

interface UploaderOrAuthor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface AssetsEntity {
  url: string;
  id: number;
  node_id: string;
  name: string;
  label?: null;
  uploader: UploaderOrAuthor;
  content_type: string;
  state: string;
  size: number;
  download_count: number;
  created_at: string;
  updated_at: string;
  browser_download_url: string;
}

const baseURL = 'https://api.github.com/repos/MTASA-Launcher/Releases/';

async function getDownloadStatistics(): Promise<number> {
  try {
    const { data } = await axios<StatisticsResult[]>({
      baseURL,
      url: '/releases',
      method: 'GET',
    });

    return data.reduce((acc, curr) => {
      if (curr.assets) {
        return acc + curr.assets.reduce((acc, curr) => acc + curr.download_count, 0);
      }
      return acc;
    }, 0);
  }
  catch (e) {
    console.log(e);
    return 0;
  }
}

async function getLatestDownload(): Promise<{ url: string, version: string; size: string; } | null> {
  try {
    const { data } = await axios<ReleaseResult>({
      baseURL,
      url: '/releases/latest',
      method: 'GET',
    });

    const asset = data.assets?.[0];

    if (!asset) throw new Error('No latest release found');

    const size = asset.size / 1024 / 1024;

    return {
      url: asset.browser_download_url,
      version: data.tag_name,
      size: `${size.toFixed(2)} MB`,
    };
  }
  catch (e) {
    console.log(e);
    return null;
  }
}

export async function getDownloadInfo() {
  const statistics = await getDownloadStatistics();
  const latest = await getLatestDownload();

  if (!latest) {
    return null;
  }

  return {
    statistics,
    latest,
  };
}
