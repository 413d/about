// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repository = process.env.GITHUB_REPOSITORY;
const repositoryOwner = process.env.GITHUB_REPOSITORY_OWNER;
const repositoryName = repository?.split('/')[1];
const userPagesRepoName = repositoryOwner ? `${repositoryOwner}.github.io`.toLowerCase() : null;
const isUserOrOrgPagesRepo = userPagesRepoName && repositoryName ? repositoryName.toLowerCase() === userPagesRepoName : false;

const site = process.env.SITE ?? (repositoryOwner ? `https://${repositoryOwner}.github.io` : undefined);
const base = process.env.BASE ?? (process.env.GITHUB_ACTIONS === 'true' && repositoryName && !isUserOrOrgPagesRepo ? `/${repositoryName}` : '/');
const isProductionBuild = process.env.GITHUB_ACTIONS === 'true';

if (isProductionBuild && !site) {
  throw new Error('SITE must be defined for production builds to generate valid canonical and sitemap URLs.');
}

// https://astro.build/config
export default defineConfig({
  site,
  base,
  vite: {
    plugins: [tailwindcss()]
  }
});
