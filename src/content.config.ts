// src/content.config.ts
import { z, defineCollection } from 'astro:content';
// YENİ: Astro'nun yerleşik dosya okuyucusunu (glob) içe aktarıyoruz
import { glob } from 'astro/loaders';

const etkinliklerCollection = defineCollection({
    // YENİ: Astro'ya Markdown dosyalarını nerede bulacağını tam olarak söylüyoruz
    loader: glob({ pattern: "**/*.md", base: "./src/content/etkinlikler" }),

    schema: z.object({
        title: z.string(),
        description: z.string().optional().default(''),
        tags: z.array(z.string()),
        thumbnail: z.string().optional(),
        file: z.string().optional(),
    }),
});

export const collections = {
    'etkinlikler': etkinliklerCollection,
};