class DropChanceSixColumns extends React.Component {
  render() {
    var self = this;
    return (<div className='u-cf'>
      {self.props.activeCharacters.map((x)=>{
        var dropChance = +(self.props.item[x + 'DropChance']);
        if(dropChance) {
          return <div className='six columns' key={D3AppController.generateUUID()}>
            <div className='u-mv-5'><span className='u-textBold'>{x}</span> - {dropChance}%</div>
          </div>
        }
      })}
    </div>)
  }
}

class KadalaChanceSixColumns extends React.Component {
  render() {
    var self = this;
    return (<div className='u-cf'>
      {self.props.activeCharacters.map((x)=>{
        var kadalaChance = +(self.props.item[x + 'KadalaChance']);
        if(kadalaChance) {
        return <div className='six columns' key={D3AppController.generateUUID()}>
            <div className='u-mv-5'>
              <div>
                <span className='u-textBold u-c-kadala'>{x}</span> - {kadalaChance}%
              </div>
              <div>{self.props.item[x + 'ShardCost']} / {D3AppController.formatNumber(+(self.props.item[x + 'ShardCost'].replace(/,/g, ''))*1.609)}</div>
            </div>
          </div>
        }
      })}
    </div>)
  }
}

class BreathSixColumns extends React.Component {
  render() {
    var self = this;
    return (<div className='u-cf'>
      {self.props.activeCharacters.map((x)=>{
        var breathCost = self.props.item[x + 'BreathCost'];

        if(+(breathCost.replace(/,/g, ''))) {
          return <div className='six columns' key={D3AppController.generateUUID()}>
            <div className='u-mv-5'>
              <div>
                <span className='u-textBold u-c-deaths'>{x}</span>
              </div>
              <div>{breathCost} / {D3AppController.formatNumber(+(breathCost.replace(/,/g, ''))*1.609)}</div>
            </div>
          </div>
        }
      })}
    </div>)
  }
}
