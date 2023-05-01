// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password1',
//   database: 'postgres',
// });

// const User = sequelize.define('User', {
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       async authorize(credentials, req) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
        
//         // Look up user from database
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//           throw new Error("invalid credentials");
//         }

//         // Verify password
//         const validPassword = await user.comparePassword(password);
//         if (!validPassword) {
//           throw new Error("invalid credentials");
//         }

//         // if everything is fine
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//     // error: '/auth/error',
//     // signOut: '/auth/signout'
//   },
//   callbacks: {
//     jwt(params) {
//       // update token
//       if (params.user?.role) {
//         params.token.role = params.user.role;
//       }
//       // return final_token
//       return params.token;
//     },
//   },
// };

// export default NextAuth(authOptions);

// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider, { UserCredentialsConfig } from "next-auth/providers/credentials";
// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: 'password1',
//   database: 'postgres',
// });

// const User = sequelize.define('User', {
//   email: {
//     type: Sequelize.STRING,
//     allowNull: false,
//     unique: true,
//   },
//   password: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     CredentialsProvider({
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };
        
//         // Look up user from database
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//           throw new Error("invalid credentials");
//         }

//         // Verify password
//         const validPassword = await user.comparePassword(password);
//         if (!validPassword) {
//           throw new Error("invalid credentials");
//         }

//         // if everything is fine
//         return {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//           role: user.role,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/auth/signin",
//   },
//   callbacks: {
//     jwt(params) {
//       // update token
//       if (params.user?.role) {
//         params.token.role = params.user.role;
//       }
//       // return final_token
//       return params.token;
//     },
//   },
// };

// export default NextAuth(authOptions);

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DataTypes, Model, Sequelize } from 'sequelize';

interface UserModelAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model<UserModelAttributes> implements UserModelAttributes {
  public createdAt!: Date;
  public updatedAt!: Date;
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public role!: string;
}

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password1',
  database: 'postgres',
});

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('NOW()'),
    },    
  },
  {
    sequelize,
    tableName: 'users',
  },
);


const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        
        // Look up user from database
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error("invalid credentials");
        }

        // Verify password
        const validPassword = await user.comparePassword(password);
        if (!validPassword) {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt(params) {
      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      // return final_token
      return params.token;
    },
  },
};

export default NextAuth(authOptions);