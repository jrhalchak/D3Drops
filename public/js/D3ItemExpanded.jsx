class D3AppRowContentsExpanded extends React.Component {
  render() {
    var item = this.props.item,
      activeCharacters = this.props.activeCharacters,
      determineCharacters = this.props.determineCharacters.split(','),
      dpsDefense = item.dps ? <div className='Item-DPSDefense'>{parseFloat(item.dps.min).toFixed(1)} - {parseFloat(item.dps.max).toFixed(1)}<div className='Item-DPSDefenseLabel u-c-grey'>Damage Per Second</div></div>:
        item.armor ? <div className='Item-DPSDefense'>{parseFloat(item.armor.min).toFixed(1)} - {parseFloat(item.armor.max).toFixed(1)}<div className='Item-DPSDefenseLabel u-c-grey'>Armor</div></div> : null,
      attacksPerSecond = item.attacksPerSecond ? <div className='Item-smallItemText'>{((parseInt(item.attacksPerSecond.min) + parseInt(item.attacksPerSecond.max)) / 2).toFixed(2)}<span className='u-c-grey'>Attacks Per Second</span></div> : null;

    return (<div className='row D3TableContainer-tableRow--expanded'>
        <div className='three columns u-cf'>
          <div className='Item-imageContainer'>
            <div className={'Item-imageBackground Item-imageBackground--' + item.displayColor}></div>
            <div className='Item-image' style={{backgroundImage: 'url(http://media.blizzard.com/d3/icons/items/large/' + item.icon + '.png)'}}></div>
          </div>
          <div className='Item-itemDescription'>
            <a target='_blank' href={item.bNetLink} className='Item-title' style={{color:item.displayColor}}>
              {item.itemName}
              <span className='Item-titleIcon fa fa-external-link'> </span>
            </a>
            <div className='u-hyphenate'>{item.typeName}</div>
            {dpsDefense}
            <div className='u-c-tan'>{item.flavorText}</div>
            <a className='Item-expandLink u-cursorPointer' onClick={this.props.handlers.toggleExpand} data-id={item.id}>Collapse <span className='Item-expandLinkIcon fa fa-chevron-up'></span></a>
          </div>
        </div>
        <div className='two columns'>
            <div>
              <div className='Item-label u-mb-5'>Simple:</div>
              <div className='Item-value u-mb-10 u-hyphenate'>{item.typeSimple}</div>
            </div>
            <div>
              <div className='Item-label u-c-kadala u-mb-5'>Kadala:</div>
              <div className='Item-value u-mb-10 u-hyphenate'>{item.typeKadala}</div>
            </div>
            <div>
              <div className='Item-label u-mb-5'>Torment Only:</div>
              <div className='Item-value u-mb-10 u-hyphenate'>{item['Torment Only'] == "TRUE" ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <div className='Item-label u-mb-5'>Hardcore Only:</div>
              <div className='Item-value u-mb-10 u-hyphenate'>{item.isHardcoreOnly ? 'Yes' : 'No'}</div>
            </div>
            <div>
              <div className='Item-label u-mb-5'>Seasonal-Drop Only:</div>
              <div className='Item-value u-mb-10 u-hyphenate'>{item.isSeasonRequiredToDrop ? 'Yes: ' + item.Season : 'No'}</div>
            </div>
        </div>
        <div className='one columns'>
          <div className='Item-label u-mb-5'>Suitable For:</div>
          {determineCharacters.map((c)=><div>{c}</div>)}
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
            <div className='Item-label u-mb-5'>Kadala Chance &amp; Spend:</div>
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
