-- Enable realtime for page_content so admin saves are pushed to public visitors without refresh
do $$
begin
  execute 'alter publication supabase_realtime add table public.page_content';
exception
  when duplicate_object then null;
end $$;
