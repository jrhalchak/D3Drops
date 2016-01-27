class D3AppRowContentsExpanded extends React.Component {
  render() {
    var item = this.props.item,
      activeCharacters = this.props.activeCharacters,
      determineCharacters = this.props.determineCharacters,
      toggleExpand = this.props.handlers.toggleExpand;

    return (<div className='row D3TableContainer-tableRow--expanded'>
      <div className='six columns'>
        <div className='row'>
          <div className='seven columns u-cf'>
            <div className='Item-imageContainer'>
              <div className={'Item-imageBackground Item-imageBackground--' + item.displayColor}></div>
              <div className='Item-image' style={{backgroundImage: 'url(http://media.blizzard.com/d3/icons/items/large/' + item.icon + '.png)'}}></div>
            </div>
            <D3ItemDescription item={item} toggleExpand={toggleExpand} />
          </div>
            <div className='five columns'>
                <div className='u-mb-10'>
                  <span className='Item-label'>Simple:</span>
                  <span className='Item-value u-hyphenate'>{item.typeSimple}</span>
                </div>
                <div className='u-mb-10'>
                  <span className='Item-label u-c-kadala'>Kadala:</span>
                  <span className='Item-value u-hyphenate'>{item.typeKadala}</span>
                </div>
                <div className='u-mb-10'>
                  <span className='Item-label'>Torment Only:</span>
                  <span className='Item-value u-hyphenate'>{item['Torment Only'] == "TRUE" ? 'Yes' : 'No'}</span>
                </div>
                <div className='u-mb-10'>
                  <span className='Item-label'>Hardcore Only:</span>
                  <span className='Item-value u-hyphenate'>{item.isHardcoreOnly == 'TRUE' ? 'Yes' : 'No'}</span>
                </div>
                <div className='u-mb-10'>
                  <span className='Item-label'>Seasonal-Drop Only:</span>
                  <span className='Item-value u-hyphenate'>{item.isSeasonRequiredToDrop ? 'Yes: ' + item.Season : 'No'}</span>
                </div>
                <div className='u-mb-10'>
                  <span className='Item-label'>Item Level:</span>
                  <span className='Item-value u-hyphenate'>{item.itemLevel}</span>
                </div>
                <div className='u-borderTopWhite u-mb-10'>
                  <div className='Item-label'>Suitable For:</div>
                  <div className='u-mt-10 u-hyphenate'>{determineCharacters}</div>
                </div>
                <div className='u-borderTopWhite u-mb-10 u-textLarge'>
                  <div><span className='u-c-grey'>Required Level:</span> <span className='Item-requiredLevel'>{item.requiredLevel}</span></div>
                </div>

                {item.accountBound == 'true' ? <div className='u-borderTopWhite u-mb-10 u-textLarge'>
                  <div className='u-c-tan'>Account Bound</div>
                </div> : null }

                <div className='u-borderTopWhite u-mb-10 u-textLarge'>
                  <div className='u-c-tan'>Unique Equipped</div>
                </div>

                <div className='u-borderTopWhite u-mb-10'>
                <div className='u-c-tan'>{item.flavorText}</div>
                </div>
            </div>
          </div>
        </div>
        <div className='six columns'>
          <div className='row'>
            <div className='four columns u-ph-10'>
              <div className='Item-label u-mb-5'>Drop Chance:</div>
              <DropChanceSixColumns item={item} activeCharacters={activeCharacters} />
              <div className='Item-labelExplanation u-mb-10 u-c-tan u-cb u-borderTopWhite'>
                When the game rolls a legendary for a given slot, the percent chance of the item that can appear.
              </div>
            </div>
            <div className='four columns u-ph-10'>
              <div className='Item-label u-mb-5'>Kadala Chance &amp; Spend:</div>
              <KadalaChanceSixColumns item={item} activeCharacters={activeCharacters} />
              <div className='Item-labelExplanation u-mb-10 u-cb u-borderTopWhite'>
                <span className='u-c-tan'>On average, you can expect to see the item once per this amount of <span className='u-c-kadala'>Blood Shards</span> spent.
                </span> / <span className='u-c-tan'>Only <span className='u-textBold'>4 out of 5</span> people will have the item after spending this amount of <span className='u-c-kadala'>Blood Shards</span>.</span>
              </div>
            </div>
            <div className='four columns u-ph-10'>
            <div className='Item-label u-mb-5'>Death's Breath Spend:</div>
              <BreathSixColumns item={item} activeCharacters={activeCharacters} />
              <div className='Item-labelExplanation u-mb-10 u-cb u-borderTopWhite'>Upgrade rare to legendary</div>
              <div className='Item-labelExplanation u-mb-10'>
                <span className='u-c-tan'>On average, you can expect to see the item once per this amount of <span className='u-c-deaths'>Death's Breath</span> spent.
                </span> / <span className='u-c-tan'>Only <span className='u-textBold'>4 out of 5</span> people will have the item after spending this amount of  <span className='u-c-deaths'>Death's Breath</span>.</span>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

// TODO: break this entire component into a million pieces!
class D3ItemDescription extends React.Component {
  returnAttribute(x) {
      return <div className={'Item-itemAttribute u-mb-10' + (x.color == 'orange' ? ' u-c-legendary' : x.color == 'blue' ? ' u-c-blue' : '')} key={D3AppController.generateUUID()}>
        {x.text}
      </div>
  }
  render() {
    var self = this,
      item = this.props.item,

      dpsMin = item.dps ? parseFloat(item.dps.min).toFixed(1) : null,
      dpsMax = item.dps ? parseFloat(item.dps.max).toFixed(1) : null,
      dpsText = dpsMin && dpsMax ? dpsMin == dpsMax ? dpsMax : dpsMin + ' - ' + dpsMax : null,

      armorMin = item.armor ? parseFloat(item.armor.min).toFixed(1) : null,
      armorMax = item.armor ? parseFloat(item.armor.max).toFixed(1) : null,
      armorText = armorMin && armorMax ? armorMin == armorMax ? armorMax : armorMin + ' - ' + armorMax : null,

      dpsDefense = item.dps ? <div className='Item-DPSDefense'>{dpsText}<div className='Item-DPSDefenseLabel u-c-grey'>Damage Per Second</div></div>:
        item.armor ? <div className='Item-DPSDefense'>{armorText}<div className='Item-DPSDefenseLabel u-c-grey'>Armor</div></div> : null,
      attacksPerSecond = item.attacksPerSecond ? <div className='Item-smallItemText u-mt-5'>{((parseInt(item.attacksPerSecond.min) + parseInt(item.attacksPerSecond.max)) / 2).toFixed(2)} <span className='u-c-grey'>Attacks Per Second</span></div> : null,

      primaryStats = item.attributes.primary.length ? item.attributes.primary.map(self.returnAttribute) : null,
      secondaryStats = item.attributes.secondary.length ? item.attributes.secondary.map(self.returnAttribute) : null,
      passiveStats = item.attributes.passive.length ? item.attributes.passive.map(self.returnAttribute) : null,

      randomAffixes = item.randomAffixes.length ? item.randomAffixes.map((x)=>{
        var affixes = x.oneOf.map((y, i, a)=>{
          var att = y.attributes,
          primary = att.primary.length ? att.primary.map(self.returnAttribute) : null,
          secondary = att.secondary.length ? att.secondary.map(self.returnAttribute) : null,
          passive = att.passive.length ? att.passive.map(self.returnAttribute) : null;

          return <div>
            {primary}
            {secondary}
            {passive}
          </div>
        });

        return (<div className='u-mb10'>
          <div className='u-c-blue u-mb-10'>One of <span className='u-c-value'>{affixes.length}</span> Magic Properties (varies)</div>
          <div className='u-ml-10'>{affixes}</div>
        </div>)
      }) : null,

      bonusProperties = item.bonusAffixesMax != '0' && item.bonusAffixesMin == item.bonusAffixesMax
        ? <div className='u-mb-5 u-mt-10 u-c-blue'>+<span className='u-c-value'>{item.bonusAffixesMax}</span> Random Magic Properties</div>
        : item.bonusAffixesMax != '0'
          ? <div className='u-mb-5 u-mt-10 u-c-blue'>+<span className='u-c-value'>{item.bonusAffixesMin}</span>-<span className='u-c-value'>{item.bonusAffixesMax}</span> Random Magic Properties</div>
          : null,

      isSet = item.set || null,
      setName = isSet ? item.set.name : null,
      setItems = isSet ? item.set.items.map((x)=> x.name) : null,
      setBonuses = isSet && item.set.ranks && item.set.ranks.length ? item.set.ranks.map((x)=>{
        var att = x.attributes,
          primary = att.primary.length ? att.primary.map(self.returnAttribute) : null,
          secondary = att.secondary.length ? att.secondary.map(self.returnAttribute) : null,
          passive = att.passive.length ? att.passive.map(self.returnAttribute) : null;

        return <div className='u-c-grey'>
          <div>({x.required}) Set:</div>
          <div className='u-ml-10'>
            {primary}
            {secondary}
            {passive}
          </div>
        </div>
      }) : null,

      hasSockets = item.attributesRaw.Sockets && item.attributesRaw.Sockets.max && item.attributesRaw.Sockets.max != '0',
      sockets = [];

      if(hasSockets) {
        for(let i = 1; i <= parseInt(item.attributesRaw.Sockets.max); i++) {
          sockets.push(<div className='u-mb-10 u-mt-10'><span className='fa fa-circle-o u-c-grey'></span> <span className='u-c-blue'>Empty Socket</span></div>);
        }
      } else {
        sockets = null;
      }


    return <div className='Item-itemDescription'>
        <a target='_blank' href={item.bNetLink} className='Item-title' style={{color:item.displayColor}}>
          {item.itemName}
          <span className='Item-titleIcon fa fa-external-link'> </span>
        </a>
        <div className='u-hyphenate'>{item.typeName}</div>
        {dpsDefense}
        {attacksPerSecond}
        <div className='u-mv-10'>
          {primaryStats ? <div className='u-mb-5 u-mt-10'>Primary</div> : null}
          {primaryStats}
          {secondaryStats ? <div className='u-mb-5 u-mt-10'>Secondary</div> : null}
          {secondaryStats}
          {passiveStats ? <div className='u-mb-5 u-mt-10'>Passive</div> : null}
          {passiveStats}
        </div>
        {randomAffixes}
        {bonusProperties}
        {sockets}
        {isSet ? <div className='u-mb-5 u-mt-10 u-c-set u-cursorHelp' title={setItems.join(', ')}>{setName}</div> : null}
        {setBonuses}

        <a className='Item-expandLink u-cursorPointer u-displayInlineBlock u-mt-10' onClick={this.props.toggleExpand} data-id={item.id}>Collapse <span className='Item-expandLinkIcon fa fa-chevron-up'></span></a>
      </div>
  }
}
