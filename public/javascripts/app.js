(function(window, undefined) {
    "use strict";

    window.BK = window.BK || {};

    window.BK.App = {

        /**
         * @property tmpl
         * @property count
         * @property [ store collection of html places ]
         */
        tmpl: {
            count: 0,
            elLi: []
        },

        /**
         * Responsible to store all places/cities
         * @property PLACES
         */
        PLACES: [
            {name: "Moscow", count: 12, content: "<p>Moscow description</p>"},
            {name: "Amsterdam", count: 25, content: "Amsterdam description"},
            {name: "Lisbon", count: 15, content: "Lisbon description"},
            {name: "Berlin", count: 19, content: "Berlin description"},
            {name: "Madrid", count: 25, content: "Madrid description"}
        ],

        /**
         * Responsible to initialize the script
         * @method init
         */
        init: function() {
            this.PlacesByAlphabetic();
        },

        /**
         * Responsible to re-organize the collection of places/cities
         * by alphabetical order
         * call the renderView method
         * @method PlacesByAlphabetic
         */
        PlacesByAlphabetic: function() {
            var places = this.PLACES,
                data = places.sort(function(p1, p2) {
                var newP1 = p1.name.toLowerCase();
                var newP2 = p2.name.toLowerCase();

                if ( newP1 < newP2 ) {
                    return -1;
                } else if ( newP1 > newP2 ) {
                    return 1;
                }
                return 0;
            });

            this.renderView(data);
        },

        /**
         * Responsible to receive the data and replace into
         * the template and render on the page
         * @method renderView
         * @param data [ has the data for places/cities ]
         */
        renderView: function(data) {
            var name, count, content,
                dataLength = data.length,
                i = 0;

            for ( ; i < dataLength; i++ ) {
                if ( this.tmpl.count <= 1 ) {
                    this.tmpl.elLi.push('<li class="place-item">' +
                        '<a href="' + data[i].name + '" title="' + data[i].name + '" class="item-name" data-content="' + data[i].content + '"> ' + data[i].name + ' </a>' +
                        '<span class="count">(' + data[i].count + ')</span>' +
                        '</li>');

                    this.tmpl.count++;
                }

                if ( this.tmpl.count === 2 ) {
                    this.placesListArrange();
                    this.tmpl.elLi = [];
                    this.tmpl.count = 0;
                } else if ( [i] == (dataLength - 1) ) {
                    this.placesListArrange();
                    this.tmpl.elLi = [];
                    this.tmpl.count = 0;
                }
            }

            this.addPlacesClickEvent();
        },

        /**
         * Responsible to prepare cities in the right "ol"
         * @method placesListArrange
         */
        placesListArrange: function() {
            var elOl = document.createElement('ol'),
                result = document.getElementById('results'),
                elLi = this.tmpl.elLi,
                elLiLength = this.tmpl.elLi.length,
                i = 0;

            elOl.className = 'places';
            result.appendChild(elOl);

            for ( ; i < elLiLength; i++ ) {
                elOl.innerHTML += elLi[i];
            }

        },

        /**
         * Responsible to attach events cross-browser
         * and call for action
         * @method addPlacesClickEvent
         */
        addPlacesClickEvent: function() {
            var elItem = document.getElementsByClassName('item-name'),
                elItemLength = elItem.length,
                that = this,
                i = 0;

            for ( ; i < elItemLength; i++ ) {
                if ( elItem[i].addEventListener ) {
                    elItem[i].addEventListener('click', that.showPlaceContent, false);
                }
                else {
                    elItem[i].attachEvent('onclick', that.showPlaceContent);
                }
            }
        },

        /**
         * Responsible to get the content from the place
         * clicked and show on the content wrapper
         * @method showPlaceContent
         */
        showPlaceContent: function(e) {
            var placeContent = this.getAttribute('data-content'),
                elContentWrapper = document.getElementById('additional-content');

            elContentWrapper.innerHTML = placeContent;

            e.preventDefault();
        }
    };

})(window);

BK.App.init();
