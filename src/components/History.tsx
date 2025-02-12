// Update the fetchForms function in History.tsx
const fetchForms = async () => {
  try {
    setLoading(true);
    const { data: fgasData, error: fgasError } = await supabase
      .from('fgas_logs')
      .select(`
        id,
        status,
        created_at,
        updated_at,
        system_id,
        technician_id,
        systems (
          site_id,
          sites (
            client_name
          )
        ),
        technicians (
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (fgasError) throw fgasError;

    const formattedData = (fgasData || []).map(form => ({
      id: form.id,
      type: 'fgas' as const,
      created_at: form.created_at,
      updated_at: form.updated_at,
      status: form.status,
      site_name: form.systems?.sites?.client_name,
      technician_name: form.technicians?.name
    }));

    setForms(formattedData);
  } catch (error) {
    console.error('Error fetching forms:', error);
  } finally {
    setLoading(false);
  }
};

export default fetchForms