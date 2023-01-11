import axios from 'axios';

export async function getServerProfile(ip: string, port: number) {
  try {
    const { status, data } = await axios({
      baseURL: 'https://backend-mta-launcher.vercel.app/',
      url: '/server-profile',
      method: 'get',
      params: {
        ip,
        port,
      }
    });

    if (status !== 200) {
      throw new Error('Failed to fetch server profile');
    }

    return data;

  } catch (e) {
    console.log(e);
    return null;
  }
};

export async function getServer(ip: string, port: number) {
  try {
    const { status, data } = await axios({
      baseURL: 'https://mtasa-api.com',
      url: '/server',
      method: 'get',
      params: {
        ip,
        asePort: port + 123,
      }
    });

    if (status !== 200) {
      throw new Error('Failed to fetch server profile');
    }

    return data;

  } catch (e) {
    console.log(e);
    return null;
  }
};

