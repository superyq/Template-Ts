import "vue-router";

export {};

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean;
    transition?: string;
    title?: string;
    hidden?: boolean;
    requiresAuth?: boolean;
  }
}
