/**
 * @interface JsonWebTokenEnv
 */
export interface JsonWebTokenEnv {
  secret: string;
  expires: number;
}

/**
 * @interface CloudinaryEnv
 */
export interface CloudinaryEnv {
  cloudinary_name: string;
  cloudinary_key: string;
  cloudinary_secret: string;
}

/**
 * @interface Env
 */
export interface Env {
  NODE_ENV: string;
  IS_NODE_ENV_DEVELOPMENT: boolean;
  port: number;
  host: string;

  jwt: JsonWebTokenEnv;
  cloudinary: CloudinaryEnv;
}

const variables: Env = {
  NODE_ENV: process.env.NODE_ENV,
  IS_NODE_ENV_DEVELOPMENT: process.env.NODE_ENV === 'development',

  host: process.env.HOST || 'http://localhost:3333',

  port: Number(process.env.PORT) || 3333,

  jwt: {
    secret: process.env.SECRET_JWT,

    /** 24 hours in seconds (s) */
    expires: 24 * 3600,
  },

  /** Cloudinary variables  */
  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_key: process.env.CLOUDINARY_KEY,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
  },
};

export default variables;
