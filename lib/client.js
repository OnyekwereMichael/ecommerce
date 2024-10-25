import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'gr4szvd9',
    dataset: 'production',
    apiVersion: '2022-03-07',
    useCdn: true,
    token: import.meta.env.VITE_SANITY_TOKEN,
});

// to use our sanity images 
const builder = imageUrlBuilder(client);

// to initialize it 
export function urlFor(source) {
return builder.image(source);
}