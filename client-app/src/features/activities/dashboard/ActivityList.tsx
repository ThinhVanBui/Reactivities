import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemContent, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const ActivityList = () => {
  const [target, setTarget] = useState('');
  const {activityStore} = useStore();
  const {loading, activitiesByDate, selectActivity}=activityStore;

  const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <ItemContent>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <p>{activity.description}</p>
                <p>{activity.city}, {activity.venue}</p>
              </Item.Description>
              <Item.Extra>
                <Button onClick={() => selectActivity(activity.id)} floated='right' content='View' color='blue' />
                <Button 
                  name={activity.id}
                  loading={loading && target === activity.id} 
                  onClick={(e) => handleActivityDelete(e, activity.id)} 
                  floated='right' 
                  content='Delete' 
                  color='red' />
                <Label basic content={activity.category}/>
              </Item.Extra>
            </ItemContent>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
