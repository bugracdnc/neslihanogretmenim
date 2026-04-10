export interface Category {
    name: string;
    slug: string;
    image: string;
}

export const categories: Category[] = [
    {
        name: "1. Sınıf",
        slug: "1-sinif",
        image: "/images/categories/sinif-1.jpg",
    },
    {
        name: "2. Sınıf",
        slug: "2-sinif",
        image: "/images/categories/sinif-2.jpg",
    },
    {
        name: "3. Sınıf",
        slug: "3-sinif",
        image: "/images/categories/sinif-3.jpg",
    },
    {
        name: "4. Sınıf",
        slug: "4-sinif",
        image: "/images/categories/sinif-4.jpg",
    },
    {
        name: "Belirli Gün ve Haftalar",
        slug: "belirli-gunler",
        image: "/images/categories/belirli.jpg",
    },
    {
        name: "Görsel Sanatlar",
        slug: "gorsel-sanatlar",
        image: "/images/categories/sanat.jpg",
    },
];