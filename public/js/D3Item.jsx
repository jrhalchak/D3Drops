class D3AppRowContents extends React.Component {
  render() {
    var item = this.props.item,
      activeCharacters = this.props.activeCharacters,
      determineCharacters = this.props.determineCharacters,
      toggleExpand = this.props.handlers.toggleExpand;

    return (<div className='row D3TableContainer-tableRow'>
        <div className='three columns u-cf'>
          <div className='Item-imageContainer'>
            <div className={'Item-imageBackground Item-imageBackground--' + item.displayColor}></div>
            <div className='Item-image' style={{backgroundImage: 'url(http://media.blizzard.com/d3/icons/items/small/' + item.icon + '.png)'}}></div>
          </div>
          <div className='Item-itemDescription'>
            <a target='_blank' href={item.bNetLink} className='Item-title' style={{color:item.displayColor}}>
              <span className='Item-titleLabel'>{item.itemName}</span>
              <span className='Item-titleIcon fa fa-external-link'> </span>
            </a>
            <div className='u-hyphenate'>{item.typeName}</div>
            <a className='Item-expandLink u-cursorPointer' onClick={toggleExpand} data-id={item.id}>Expand <span className='Item-expandLinkIcon fa fa-chevron-down'></span></a>
          </div>
        </div>
        <div className='two columns'>
          <div className='row'>
            <div className='six columns'>
              <div className='Item-label'>Simple:</div>
              <div className='Item-value u-hyphenate'>{item.typeSimple}</div>
            </div>
            <div className='six columns'>
              <div className='Item-label u-c-kadala'>Kadala:</div>
              <div className='Item-value u-hyphenate'>{item.typeKadala}</div>
            </div>
          </div>
        </div>
        <div className='one columns'>{determineCharacters}</div>
        <div className='six columns'>
          <div className='row'>
            <div className='four columns u-ph-10'>
              <DropChanceSixColumns item={item} activeCharacters={activeCharacters} />
            </div>
            <div className='four columns u-ph-10'>
              <KadalaChanceSixColumns item={item} activeCharacters={activeCharacters} />
            </div>
            <div className='four columns u-ph-10'>
              <BreathSixColumns item={item} activeCharacters={activeCharacters} />
            </div>
          </div>
        </div>
      </div>)
  }
}
