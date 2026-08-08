import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block'
        }
      ],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    }),

    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of:[
        {
          type:'string'
        }
      ],
    }),

    defineField({
      name:'publishedAt',
      title:'Published At',
      type:'datetime',
    }),

    defineField({
      name:'mainImage',
      title:'Main Image',
      type:'image',
      options:{
        hotspot:true
      },
    }),

    defineField({
      name:'category',
      title:'Category',
      type:'string',
    }),

    defineField({
      name:'author',
      title:'Author',
      type:'string',
    }),

  ],
})
