import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, ItemContent, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivityList = ({ activities, selectActivity, deleteActivity, submitting }: Props) => {
  const [target, setTarget] = useState('');
  const handleActivityDelete = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => (
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
                  loading={submitting && target === activity.id} 
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

export default ActivityList;
