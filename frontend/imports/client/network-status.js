import { Template } from 'meteor/templating';
import './network-status.html';

Template.networkStatus.helpers({
  network: () => Session.get('network'),
  syncing: () => Session.get('syncing'),
  outOfSync: () => Session.get('outOfSync'),
  isConnected: () => Session.get('isConnected'),
  latestBlock: () => Session.get('latestBlock'),
});
