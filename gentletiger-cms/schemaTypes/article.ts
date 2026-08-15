import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',

  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'media', title: 'Media'},
    {name: 'seo', title: 'SEO'},
  ],

  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required().min(5).max(160),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      group: 'content',
      rows: 4,
      validation: (rule) => rule.max(320),
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
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
      group: 'seo',
      description: 'Optional. Recommended length: 50–60 characters.',
      validation: (rule) => rule.max(70),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
      rows: 4,
      description: 'Optional. Recommended length: 140–160 characters.',
      validation: (rule) => rule.max(180),
    }),

    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      group: 'seo',
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
      group: 'content',
      initialValue: () => new Date().toISOString(),
    }),

    defineField({
      name: 'visibility',
      title: 'Website Visibility',
      type: 'string',
      group: 'content',
      description: 'Unlisted articles remain available by direct URL but are removed from listings and search engines.',
      initialValue: 'public',
      options: {
        layout: 'radio',
        list: [
          {title: 'Public', value: 'public'},
          {title: 'Unlisted', value: 'unlisted'},
        ],
      },
    }),

    defineField({
      name:'mainImage',
      title:'Main Image',
      type:'image',
      group: 'media',
      options:{
        hotspot:true
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Describe the image for accessibility and search engines.',
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name:'category',
      title:'Category',
      type:'string',
      group: 'content',
    }),

    defineField({
      name:'author',
      title:'Author',
      type:'string',
      group: 'content',
    }),

  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'mainImage',
    },
    prepare: ({title, subtitle, media}) => ({
      title: title || 'Untitled article',
      subtitle: subtitle || 'Uncategorized',
      media,
    }),
  },
})
