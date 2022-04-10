-- Right now, users can't be deleted because of the fkey relationship on profile
-- However, the data readings should not be deleted when the user deletes their profile
-- Just remove the fkey requirement on profile meaning any devices not transferred will be lost.
alter table profile
  drop constraint if exists profile_profile_id_fkey;