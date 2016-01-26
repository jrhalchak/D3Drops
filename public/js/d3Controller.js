var D3AppController = D3AppController || (function(GLOBAL) {

  return {
    idCache: [],
    generateUUID: function generateUUID() {
        var self = this,
          d = new Date().getTime(),
          uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
          });

        if(self.idCache.indexOf(uuid) > -1) {
          return self.generateUUID()
        } else {
          self.idCache.push(uuid);
          return uuid;
        }
    },
    getCharactersByLoot: function getCharactersByLoot(i) {
      var returnVal = [];
      if(i.isBarbLoot == 1) returnVal.push('Barbarian');
      if(i.isMonkLoot == 1) returnVal.push('Monk');
      if(i.isDHLoot == 1) returnVal.push('Demon Hunter');
      if(i.isWDLoot == 1) returnVal.push('Witch Doctor');
      if(i.isWizLoot == 1) returnVal.push('Wizard');
      if(i.isCruLoot == 1) returnVal.push('Crusader');

      return returnVal.join(', ');
    },
    getItemTypes: function(items) {
      var types = [];
      items.forEach((i)=>{
        if(types.indexOf(i) == -1) types.push(i);
      });

      D3AppModel.itemTypes = types;
      SPS.trigger('d3app:setTypes');
    },
    changeItemType: function(itemType) {
      SPS.trigger('d3app:changeType', itemType);
    },
    isScrolledPastHeaders: function() {
      return $(window).scrollTop() > ($('.js-applicationHeader').outerHeight() + 100);
    },
    updateSearchCache: function(val) {
      if(val.trim() != D3AppModel.searchCache.trim()) {
        D3AppModel.searchCache = val;
        SPS.trigger('d3app:searchUpdated');
      }
    },
    toggleChar: function(c) {
      var aChar = D3AppModel.activeCharacters,
        aCharIndex = aChar.indexOf(c),
        chars = D3AppModel.characters,
        charIndex = chars.indexOf(c);

      if(aCharIndex > -1) {
        aChar.splice(aCharIndex, 1);
      } else if (charIndex > -1){
        aChar.splice(charIndex, 0, c);
      } else {
        console.log('Character toggled with no match.')
      }

      if(aChar.length < 1) {
        D3AppModel.activeCharacters = chars.slice();
      }

      SPS.trigger('d3app:characterUpdated');
    },
    changePage: function(page) {
      SPS.trigger('d3app:changePage', page);
    },
    formatNumber: function(num) {
      return parseInt(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    init: function() {
      /*$(window).on('scroll', function(){
        var $columnHeaders = $('.js-tableHeadersContainer');
          if(appController.isScrolledPastHeaders() && $columnHeaders.not('.is-active')) {
            $columnHeaders.addClass('')
          }
      });*/
    }
  }
})(window || {});

$(function() {
  D3AppController.init();
});
