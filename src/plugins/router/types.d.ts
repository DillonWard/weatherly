import type { RouteRecordInfo } from "vue-router";

declare module 'vue-router' {
    interface RouteNamedMap {
        home: RouteRecordInfo<'home', '/', Record<never, never>, Record<never, never>, never>;
        city: RouteRecordInfo<'city', '/:country/:city', { country: string; city: string }, Record<never, never>, never>;
    }
}
