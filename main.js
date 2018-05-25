let app = new Vue({
    el: '#app',
    data: {
        enterAddress: true,
        address: "",
        filters: [
            {
                name: "Attractions",
                on: true,
                editing: true,
                settings: {
                    "sports": {
                        name: "Sports",
                        id: "sports",
                        on: true
                    },
                    "historicalSites": {
                        name: "Historical Sites",
                        id: "historicalSites",
                        on: true
                    },
                    "scenery": {
                        name: "Scenery",
                        id: "scenery",
                        on: true
                    },
                    "localCulture": {
                        name: "Local Culture",
                        id: "localCulture",
                        on: true
                    },
                    "shopping": {
                        name: "Shopping",
                        id: "shopping",
                        on: true
                    },
                    "themeParks": {
                        name: "Theme Parks & Adventurous Activities",
                        id: "themeParks",
                        on: true
                    },
                }
            },
            {
                name: "Amenities",
                on: true,
                editing: false,
                settings: {
                    "restroom": {
                    name: "Restroom",
                    id: "restroom",
                    on: true
                    },
                }
            },
            {
                name: "Food",
                on: true,
                editing: false,
                settings: {
                    "restaurant": {
                        name: "Restaurants",
                        id: "restaurant",
                        on: true
                    },
                    "cafe": {
                        name: "Cafes",
                        id: "cafe",
                        on: true
                    },
                    "fastFood": {
                        name: "Fast Foods",
                        id: "fastFood",
                        on: true
                    },
                    "zero": {
                        name: "<$20",
                        id: "zero",
                        on: true
                    },
                    "twenty": {
                        name: "$20-$50",
                        id: "twenty",
                        on: true
                    },
                    "fifty": {
                        name: "$50-$100",
                        id: "fifty",
                        on: true
                    },
                    "oneHundred": {
                        name: ">$100",
                        id: "oneHundred",
                        on: true
                    },
                }
            }
        ],
        map: null,
        mapMarkers: [
            {
                type: "Attractions",
                category: "sports",
                posX: 750,
                posY: 660,
                detail: "Indoor Football"
            },
            {
                type: "Attractions",
                category: "sports",
                posX: 100,
                posY: 800,
                detail: "Sailing"
            },
            {
                type: "Attractions",
                category: "historicalSites",
                posX: 1080,
                posY: 480,
                detail: "Indoor Football"
            },
            {
                type: "Attractions",
                category: "scenery",
                posX: 1100,
                posY: 150,
                detail: "Big field"
            },
            {
                type: "Attractions",
                category: "scenery",
                posX: 650,
                posY: 565,
                detail: "Small field"
            },
        //    food/drink
            {
                type: "Food",
                category: "fastFood",
                subCat: "twenty",
                posX: 815,
                posY: 655,
                detail: "Mcdonalds"
            },
            {
                type: "Food",
                category: "restaurant",
                subCat: "fifty",
                posX: 700,
                posY: 585,
                detail: "Small restaurant"
            },
            {
                type: "Food",
                category: "fastFood",
                subCat: "oneHundred",
                posX: 550,
                posY: 850,
                detail: "Fancy Restaurant"
            },
        ]
    },
    methods: {
        useCurrentLoc: function() {
            this.enterAddress = false;
            this.address = "1 Queen Street, Auckland, New Zealand";
            this.createMap();
        },
        attractionsEditing: function () {
            this.filters[0].editing = true;
            this.filters[1].editing = false;
            this.filters[2].editing = false;
        },
        foodDrinkEditing: function() {
            this.filters[0].editing = false;
            this.filters[1].editing = true;
            this.filters[2].editing = false;
        },
        amenitiesEditing: function() {
            this.filters[0].editing = false;
            this.filters[1].editing = false;
            this.filters[2].editing = true;
        },
        addMarkers: function() {
            if (this.map === null) console.log(this.map);
            let vthis = this;
            this.mapMarkers.forEach(function(marker) {

                if (vthis.filters[0].name === marker.type && vthis.filters[0].on) {
                    if (vthis.filters[0].settings[marker.category].on) {
                        let mark = L.marker([marker.posY, marker.posX]).addTo(vthis.map);
                        mark.bindPopup(marker.posX + ", " + marker.posY + "<br>" + marker.detail);
                    }
                }

                else if (vthis.filters[2].name === marker.type && vthis.filters[2].on) {
                    console.log(marker);
                    if (vthis.filters[2].settings[marker.category].on && vthis.filters[2].settings[marker.subCat].on) {
                        let mark = L.marker([marker.posY, marker.posX]).addTo(vthis.map).bindPopup(marker.detail);
                    }
                }
            })
        },
        createMap: function() {
            let vthis = this;
            Vue.nextTick(function () {
                if (document.getElementById('mapID') !== null) {
                    let map = L.map('mapID', {
                        crs: L.CRS.Simple
                    });
                    let bounds = [[0, 0], [900, 1280]];
                    let image = L.imageOverlay('map.JPG', bounds).addTo(map);
                    map.fitBounds(bounds);

                    let circle = L.circle([540, 770], {
                        color: 'blue',
                        fillColor: '#4286f4',
                        fillOpacity: 0.5,
                        radius: 15
                    }).addTo(map);

                    vthis.map = map;
                    vthis.addMarkers();
                }
            })
        }
    }
});
