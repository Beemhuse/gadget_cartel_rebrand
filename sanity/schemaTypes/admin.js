import {defineField, defineType} from 'sanity'
import {v4 as uuidv4} from 'uuid'
export const admin = defineType({
  name: 'admin',
  type: 'document',
  fields: [
    defineField({
      type: 'string',
      name: 'id',
    }),
    
    defineField({
      type: 'string',
      name: 'role',
    }),

    defineField({
      type: 'string',
      name: 'name',
    }),
    defineField({
      type: 'string',
      name: 'email',
    }),
    defineField({
      type: 'string',
      name: 'password',
      hidden: true,
    }),
    defineField({
      type: 'string',
      name: 'resetToken',
      title: 'Password Reset Token',
      hidden: false,
    }),
    defineField({
      type: 'datetime',
      name: 'resetTokenExpiry',
      title: 'Token Expiry Date',
      hidden: false,
    }),
  ],
  initialValue: () => ({
    id: uuidv4(), // Generate a UUID for the ID field
  }),
})
