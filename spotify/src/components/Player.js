import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaVolumeUp, FaVolumeDown } from 'react-icons/fa';

const PlayerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.grey};
  border-top: 1px solid ${({ theme }) => theme.colors.primary};
  z-index: 1000;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const AlbumCover = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 10px;
`;

const TrackInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  margin-left: 20px;
`;

const TrackTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const TrackArtist = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 5px;
`;

const CenterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 20px;
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VolumeSlider = styled.input`
  width: 100px;
  margin: 0 10px;
`;

const Player = ({ token, track }) => {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [internalVolume, setInternalVolume] = useState(0.5);

  useEffect(() => {
    const initializePlayer = () => {
      if (window.Spotify) {
        const newPlayer = new window.Spotify.Player({
          name: 'Web Playback SDK Player',
          getOAuthToken: cb => { cb(token); },
          volume: volume
        });

        newPlayer.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          setDeviceId(device_id);
        });

        newPlayer.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        newPlayer.addListener('initialization_error', ({ message }) => {
          console.error('Failed to initialize', message);
        });

        newPlayer.addListener('authentication_error', ({ message }) => {
          console.error('Failed to authenticate', message);
        });

        newPlayer.addListener('account_error', ({ message }) => {
          console.error('Failed to validate Spotify account', message);
        });

        newPlayer.addListener('playback_error', ({ message }) => {
          console.error('Failed to perform playback', message);
        });

        newPlayer.addListener('player_state_changed', state => {
          if (!state) return;
          setIsPlaying(!state.paused);
          setInternalVolume(state.volume);
        });

        newPlayer.connect();
        setPlayer(newPlayer);
      }
    };

    if (window.spotifySDKReady && !player) {
      initializePlayer();
    } else {
      window.addEventListener('spotifySDKReady', initializePlayer);
      return () => {
        window.removeEventListener('spotifySDKReady', initializePlayer);
      };
    }
  }, [token, player, volume]);

  useEffect(() => {
    const playTrack = async () => {
      if (player && track && deviceId) {
        try {
          const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [track.uri] }),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error playing track:', errorData);
            if (response.status === 401) {
              alert('Your session has expired. Please log in again.');
              window.localStorage.removeItem('token');
              window.location.reload();
            }
          }
        } catch (error) {
          console.error('Error playing track:', error);
        }
      }
    };

    playTrack();
  }, [player, track, deviceId, token]);

  const togglePlayPause = async () => {
    if (isPlaying) {
      await player.pause();
    } else {
      await player.resume();
    }
  };

  const changeVolume = async (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setInternalVolume(newVolume);
    if (player) {
      await player.setVolume(newVolume);
    }
  };

  return (
    <PlayerContainer>
      <LeftSection>
        {track && track.album && (
          <>
            <AlbumCover src={track.album.images[0].url} alt="Album cover" />
            <TrackInfo>
              <TrackTitle>{track.name}</TrackTitle>
              <TrackArtist>{track.artists[0].name}</TrackArtist>
            </TrackInfo>
          </>
        )}
      </LeftSection>
      <CenterSection>
        <ControlButton onClick={togglePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </ControlButton>
      </CenterSection>
      <RightSection>
        <VolumeControl>
          <FaVolumeDown />
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={internalVolume}
            onChange={changeVolume}
          />
          <FaVolumeUp />
        </VolumeControl>
      </RightSection>
    </PlayerContainer>
  );
};

export default Player;
