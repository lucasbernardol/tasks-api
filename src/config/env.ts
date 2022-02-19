/**
 * @interface IJwTEnv
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

export default {
  NODE_ENV: process.env.NODE_ENV,
  IS_NODE_ENV_DEVELOPMENT: process.env.NODE_ENV === 'development',

  port: Number(process.env.PORT) || 3333,
  host: process.env.HOST,

  jwt: {
    secret: process.env.SECRET_JWT,

    /**
     * 24 hours in seconds (s)
     */
    expires: 24 * 3600,
  },

  cloudinary: {
    cloudinary_name: process.env.CLOUDINARY_NAME,
    cloudinary_key: process.env.CLOUDINARY_KEY,
    cloudinary_secret: process.env.CLOUDINARY_SECRET,
  },
} as Env;
