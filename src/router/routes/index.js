/**
 * @description 路由信息
 */

export default [
    {
        name: "test",
        path: "/test",
        component: () => import("@/views/test")
    },
    {
        name: "iframe",
        path: "/iframe",
        component: () => import("@/views/iframe")
    },
    {
        name: "index",
        path: "/",
        component: () => import("@/views/index"),
        redirect: "/map ",
        meta: {
            name: "首页",
        },
        children: [
            {
                path: "/map",
                name: "map",
                meta: {
                    name: "首页"
                },
                component: () => import("@/views/index/views/map")
            },
            {
                path: "/overview",
                name: "overview",
                meta: {
                    name: "综合态势"
                },
                component: () => import("@/views/index/views/overview")
            },
            {
                path: "/safe",
                name: "safe",
                meta: {
                    name: "园区安防"
                },
                component: () => import("@/views/index/views/safe")
            },
            {
                path: "/travel",
                name: "travel",
                meta: {
                    name: "便携通行"
                },
                component: () => import("@/views/index/views/travel")
            },
            {
                path: "/energy",
                name: "energy",
                meta: {
                    name: "能源管理"
                },
                component: () => import("@/views/index/views/energy")
            }, {
                path: "/device",
                name: "device",
                meta: {
                    name: "设备设施"
                },
                component: () => import("@/views/index/views/device")
            }
        ]
    }, {
        name: "point-popup-AI",
        path: "/point-popup-AI",
        component: () => import("../../components/three-scene/components/point-popup-AI")
    }, {
        name: "point-popup-camera",
        path: "/point-popup-camera",
        component: () => import("../../components/three-scene/components/point-popup-camera")

    }, {
        name: "point-popup-comprehensive",
        path: "/point-popup-comprehensive",
        component: () => import("../../components/three-scene/components/point-popup-comprehensive")

    },
    {
        name: "point-popup-door",
        path: "/point-popup-door",
        component: () => import("../../components/three-scene/components/point-popup-door")

    }, {
        name: "point-popup-energy",
        path: "/point-popup-energy",
        component: () => import("../../components/three-scene/components/point-popup-energy")
    }, {
        name: "point-popup-factory",
        path: "/point-popup-factory",
        component: () => import("../../components/three-scene/components/point-popup-factory")
    }
    , {
        name: "point-popup-parking",
        path: "/point-popup-parking",
        component: () => import("../../components/three-scene/components/point-popup-parking")
    }
    , {
        name: "point-popup-safe",
        path: "/point-popup-safe",
        component: () => import("../../components/three-scene/components/point-popup-safe")
    }, {
        name: "point-popup-safe-other",
        path: "/point-popup-safe-other",
        component: () => import("../../components/three-scene/components/point-popup-safe-other")
    }, {
        name: "point-popup-traffic",
        path: "/point-popup-traffic",
        component: () => import("../../components/three-scene/components/point-popup-traffic")
    }, {
        name: "point-popup-video",
        path: "/point-popup-video",
        component: () => import("../../components/three-scene/components/point-popup-video")
    }
]
