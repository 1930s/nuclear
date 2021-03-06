import React from 'react';
import {Dimmer, Loader} from 'semantic-ui-react';

import TagDescription from './TagDescription';
import TagHeader from './TagHeader';
import TagTopList from './TagTopList';
import TagTopTracks from './TagTopTracks';
import styles from './styles.scss';

class TagView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadTagInfo(this.props.tag);
  }

  artistInfoSearchByName(artistName) {
    this.props.artistInfoSearchByName(artistName, this.props.history);
  }

  render() {
    let {
      loadTagInfo,
      addToQueue,
      artistInfoSearchByName,
      tag,
      tags,
      musicSources
    } = this.props;

    let tagInfo, topTracks, topAlbums, topArtists;
    if (tags[tag] && tags[tag].loading !== true) {
      tagInfo = tags[tag][0].tag;
      topTracks = tags[tag][1].tracks.track;
      topAlbums = tags[tag][2].albums.album;
      topArtists = tags[tag][3].topartists.artist;
    }

    return (
      <div className={styles.tag_view_container}>
        <Dimmer.Dimmable>
          <Dimmer active={tags[tag] === undefined || tags[tag].loading}>
            <Loader/>
          </Dimmer>

          {
            tags[tag] === undefined || tags[tag].loading
              ? null
              : (
                <div className={styles.tag_view}>
                  <TagHeader
                    tag={tag}
                    tagInfo={tagInfo}
                    topArtists={topArtists}
                  />
                  <TagDescription
                    tagInfo={tagInfo}
                  />
                  <div className={styles.lists_container}>
                    <TagTopList
                      topList={topArtists}
                      onClick={this.artistInfoSearchByName.bind(this)}
                      header='Top Artists'
                    />
                    <TagTopList
                      topList={topAlbums}
                      header='Top Albums'
                    />
                  </div>
                  <TagTopTracks
                    tracks={topTracks}
                    addToQueue={addToQueue}
                    musicSources={musicSources}
                  />

                </div>
              )
          }
	</Dimmer.Dimmable>
      </div>
    );
  }
}

export default TagView;
