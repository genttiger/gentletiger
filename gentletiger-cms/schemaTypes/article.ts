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
          type: 'block',
        },
        {
          type: 'image',
          title: 'Body Image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
        {
          type: 'object',
          name: 'videoFile',
          title: 'Uploaded Video',
          fields: [
            defineField({
              name: 'asset',
              title: 'Video File',
              type: 'file',
              options: {
                accept: 'video/mp4,video/webm,video/quicktime',
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Video Title',
              type: 'string',
            }),
            defineField({
              name: 'poster',
              title: 'Poster Image',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', media: 'poster'},
            prepare: ({title, media}) => ({title: title || 'Uploaded Video', media}),
          },
        },
        {
          type: 'object',
          name: 'videoEmbed',
          title: 'External Video',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube, Vimeo, or a direct HTTPS video URL.',
              validation: (rule) => rule.required().uri({scheme: ['https']}),
            }),
            defineField({
              name: 'title',
              title: 'Video Title',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'url'},
            prepare: ({title, subtitle}) => ({title: title || 'External Video', subtitle}),
          },
        },
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
