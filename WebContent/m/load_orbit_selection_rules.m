function load_orbit_selection_rules
%% load_orbit_selection_rules.m
global params
r = global_jess_engine();
r.eval(['(bind ?orbit_selection_rules_clp "' params.orbit_selection_rules_clp '")']);
r.eval('(batch ?orbit_selection_rules_clp)');

%% EOS specific rules 
if strcmp(params.CASE_STUDY,'EOS')
    call = ['(defrule ORBIT-SELECTION::MODIS_A-in-PM-b40 "To have 12h revisit time" '...
    ' ?o <-(ORBIT-SELECTION::orbit (orb ?miss) (of-instrument MODIS) (in-mission ?name)(penalty-var ?var) (is-type SSO) (raan PM)) ' ... 
    ' => ' ...
    ' (eval (str-cat  "(bind " ?var " (- " ?var " 40) )")) ' ...
    ')'];
    r.eval(call);

    call = ['(defrule ORBIT-SELECTION::MODIS_B-in-AM-b40 "To have 12h revisit time" '...
    ' ?o <-(ORBIT-SELECTION::orbit (orb ?miss) (of-instrument MODIS-B) (in-mission ?name)(penalty-var ?var) (is-type SSO) (raan AM)) ' ... 
    ' => ' ...
    ' (eval (str-cat  "(bind " ?var " (- " ?var " 40) )")) ' ...
    ')'];
    r.eval(call);
    
    call = ['(defrule ORBIT-SELECTION::CERES_A-in-AM-b40 "To have 12h revisit time" '...
    ' ?o <-(ORBIT-SELECTION::orbit (orb ?miss) (of-instrument CERES) (in-mission ?name)(penalty-var ?var) (is-type SSO) (raan AM)) ' ... 
    ' => ' ...
    ' (eval (str-cat  "(bind " ?var " (- " ?var " 40) )")) ' ...
    ')'];
    r.eval(call);

    call = ['(defrule ORBIT-SELECTION::CERES_C-in-PM-b40 "To have 12h revisit time" '...
    ' ?o <-(ORBIT-SELECTION::orbit (orb ?miss) (of-instrument CERES-C) (in-mission ?name)(penalty-var ?var) (is-type SSO) (raan PM)) ' ... 
    ' => ' ...
    ' (eval (str-cat  "(bind " ?var " (- " ?var " 40) )")) ' ...
    ')'];
    r.eval(call);
    
    call = ['(defrule ORBIT-SELECTION::ASTER-in-AM-b10 "To avoid cloudiness, higher priority than domestic instruments" '...
    ' ?o <-(ORBIT-SELECTION::orbit (orb ?miss) (of-instrument ASTER) (in-mission ?name)(penalty-var ?var) (is-type SSO) (raan AM)) ' ... 
    ' => ' ...
    ' (eval (str-cat  "(bind " ?var " (- " ?var " 10) )")) ' ...
    ')'];
    r.eval(call);
    
    call = ['(defrule ORBIT-SELECTION::AIRS-in-PM-b10 "Because METOP was to be in AM" '...
    ' ?o <-(ORBIT-SELECTION::orbit (orb ?miss) (of-instrument AIRS) (in-mission ?name)(penalty-var ?var) (is-type SSO) (raan PM)) ' ... 
    ' => ' ...
    ' (eval (str-cat  "(bind " ?var " (- " ?var " 10) )")) ' ...
    ')'];
    r.eval(call);
    
    
    
end

end