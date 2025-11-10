import type { RouteRecordInfo } from "vue-router";

export interface RouteNamedMap {
    home: RouteRecordInfo<'home', '/', Record<never, never>, Record<never, never>, never>;
    city: RouteRecordInfo<'city', '/city/:name', { name: string }, Record<never, never>, never>;
}


declare module 'vue-router'{
    interface TypesConfig { 
        RouteNamedMap: RouteNamedMap
    }
}